import AllBacklinksViewer from "@/components/allBacklinksViewer";
import ShowError from "@/components/error";
import { RenderJson } from "@/components/renderJson";
import { SplitText } from "@/components/segmentedText";
import { Loader } from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LexiconResolver from "@/components/verifyLexicon";
import getView from "@/components/views/getView";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { QtClient, useXrpc } from "@/providers/qtprovider";
import "@atcute/bluesky/lexicons";
import {
  ComAtprotoRepoDescribeRepo,
  ComAtprotoRepoGetRecord,
} from "@atcute/client/lexicons";
import {
  IdentityMetadata,
  resolveFromIdentity,
} from "@atcute/oauth-browser-client";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "preact/compat";

interface RepoData {
  data?: ComAtprotoRepoGetRecord.Output;
  repoInfo?: ComAtprotoRepoDescribeRepo.Output;
  identity?: IdentityMetadata;
  isLoading: boolean;
  error: Error | null;
}

function useRepoData(
  handle: string,
  collection: string,
  rkey: string,
): RepoData {
  const xrpc = useXrpc();
  const [state, setState] = useState<RepoData>({
    data: undefined,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchRepoData() {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        let id;
        try {
          id = await resolveFromIdentity(handle);
        } catch (err: any) {
          throw new Error("Unable to resolve identity: " + err.message);
        }
        // we dont use the main authenticated client here
        const rpc = new QtClient(id.identity.pds);
        // get the PDS
        // Start both requests without awaiting them individually
        const getRecordPromise = rpc
          .getXrpcClient()
          .get("com.atproto.repo.getRecord", {
            params: { repo: id.identity.id, collection, rkey },
            signal: abortController.signal,
          });

        const describeRepoPromise = rpc
          .getXrpcClient()
          .get("com.atproto.repo.describeRepo", {
            params: { repo: id.identity.id },
            signal: abortController.signal,
          });

        // Wait for both promises to complete in parallel
        const [response, record] = await Promise.all([
          getRecordPromise,
          describeRepoPromise,
        ]);
        // todo: actual errors
        setState({
          data: response.data,
          repoInfo: record.data,
          identity: id.identity,
          isLoading: false,
          error: null,
        });
      } catch (err: any) {
        if (err.name === "AbortError") return;

        setState({
          data: undefined,
          isLoading: false,
          error:
            err instanceof Error
              ? err
              : new Error("Unable to resolve identity: " + err.message),
        });
      }
    }

    fetchRepoData();

    return () => {
      abortController.abort();
    };
  }, [handle, xrpc]);

  return state;
}

export const Route = createLazyFileRoute("/at:/$handle/$collection/$rkey")({
  component: RouteComponent,
});

function RouteComponent() {
  const { handle, collection, rkey } = Route.useParams();
  const { data, repoInfo, identity, isLoading, error } = useRepoData(
    handle,
    collection,
    rkey,
  );

  useDocumentTitle(
    repoInfo
      ? `${repoInfo?.handle ? `${repoInfo.handle} | ` : ""}${collection} | atp.tools`
      : "atp.tools",
  );

  if (error) {
    return <ShowError error={error} />;
  }

  if (isLoading && !data) {
    return <Loader className="max-h-[calc(100vh-5rem)] h-screen" />;
  }

  if (data === undefined) return <div>No data</div>;

  // doing 'as any' here but $type is guaranteed to be on here.
  const View = getView((data.value as any).$type);

  return (
    <div className="flex flex-row justify-center w-full min-h-[calc(100vh-5rem)] max-w-[100vw]">
      <div className="max-w-md lg:max-w-2xl w-[90vw] mx-4 md:mt-16 space-y-2">
        <Link
          to={`/at:/$handle`}
          params={{
            handle: repoInfo?.did || "",
          }}
          className=""
        >
          <div>
            <h1 className="text-2xl md:text-3xl max-w-xs lg:max-w-2xl overflow-hidden text-ellipsis whitespace-nowrap text-muted-foreground font-normal">
              @{repoInfo?.handle}
              {repoInfo?.handleIsCorrect ? "" : " (invalid handle)"}
            </h1>
            <code>{identity?.id}</code>
          </div>
        </Link>
        <div>
          PDS: {identity?.pds.hostname.includes("bsky.network") && "🍄"}{" "}
          {identity?.pds.hostname}
        </div>
        {!View && (
          <div className="text-muted-foreground text-xs">
            This View is not yet implemented. If you have a need, state your
            case{" "}
            <Link
              to="/at:/$handle"
              params={{ handle: "natalie.sh" }}
              className="text-blue-700 dark:text-blue-400"
            >
              @natalie.sh
            </Link>
          </div>
        )}
        <div className="text-muted-foreground group truncate">
          <Link
            to={`/at:/$handle`}
            params={{
              handle: repoInfo?.did || "",
            }}
            className="inline dark:hover:text-blue-400 group-hover:text-blue-600 dark:text-blue-400 transition-colors duration-300"
          >
            at://{handle}
          </Link>
          <Link
            to={`/at:/$handle/$collection`}
            params={{
              handle: repoInfo?.did || "",
              collection,
            }}
            className="inline dark:hover:text-blue-400 group-hover:text-blue-600 dark:text-blue-400 transition-colors duration-300"
          >
            /{collection}
          </Link>
          /{rkey}
        </div>
        {collection === "com.atproto.lexicon.schema" && (
          <LexiconResolver did={repoInfo?.did || ""} lexiconId={rkey} />
        )}
        <div className="border-b" />
        <Tabs defaultValue={View ? "view" : "json"} className="w-full">
          <TabsList>
            {View && (
              <TabsTrigger
                value="view"
                className="dark:hover:text-gray-300 hover:text-gray-700 transition-colors duration-300"
              >
                View
              </TabsTrigger>
            )}
            <TabsTrigger
              value="json"
              className="dark:hover:text-gray-300 hover:text-gray-700 transition-colors duration-300"
            >
              JSON
            </TabsTrigger>
            <TabsTrigger
              value="text"
              className="dark:hover:text-gray-300 hover:text-gray-700 transition-colors duration-300"
            >
              JSON (Text)
            </TabsTrigger>
          </TabsList>
          {View && (
            <TabsContent value="view" className="w-full overflow-x-auto">
              <View data={data} repoData={repoInfo} />
            </TabsContent>
          )}
          <TabsContent value="json" className="w-full overflow-x-auto">
            <RenderJson
              data={data}
              did={identity?.id ?? ""}
              pds={identity?.pds.toString()!}
            />
          </TabsContent>
          <TabsContent value="text" className="w-full overflow-x-auto">
            <div className="whitespace-pre-wrap font-mono">
              <SplitText text={JSON.stringify(data, null, 4)} />
            </div>
          </TabsContent>
        </Tabs>
        <AllBacklinksViewer aturi={`at://${handle}/${collection}/${rkey}`} />
      </div>
    </div>
  );
}
