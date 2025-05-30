import { useEffect, useState } from "react";
import {
  AppBskyFeedPost,
  AppBskyActorGetProfile,
} from "@atcute/client/lexicons";
import { ArrowRight } from "lucide-react";
import { SegmentedText } from "@/components/segmentedText";
import { QtClient } from "@/providers/qtprovider";
import { Link } from "@tanstack/react-router";
import {
  AppBskyEmbedImagesLayout,
  getBlueskyCdnLink,
} from "@/components/json/appBskyEmbedImages";

type BlueskyPost = AppBskyFeedPost.Record;

const BlueskyEmbed = ({
  embed,
  did,
  hasBorder = true,
}: {
  embed: BlueskyPost["embed"];
  did: string;
  hasBorder?: boolean;
}) => {
  if (!embed) return null;
  return (
    <div className={`rounded-lg`}>
      {embed.$type === "app.bsky.embed.external" ? (
        <div
          className={`flex flex-col items-left justify-center mt-2 ${hasBorder && "border border-neutral-500/50 rounded-lg"}`}
        >
          {embed.external.thumb && (
            <img
              src={getBlueskyCdnLink(
                did,
                embed.external.thumb.ref.$link,
                "jpeg",
              )}
              alt={embed.external.title}
              className="w-full object-cover rounded-lg mb-2"
            />
          )}
          <h3 className="font-bold pl-2">{embed.external.title}</h3>
          <p className="text-gray-600 text-sm pl-2 pb-1">
            {embed.external.description}
          </p>
        </div>
      ) : embed.$type === "app.bsky.embed.images" ? (
        <div
          className={`flex flex-col items-center justify-center mt-2 ${hasBorder && "border border-neutral-500/50 rounded-lg"}`}
        >
          <AppBskyEmbedImagesLayout did={did} images={embed.images} />
        </div>
      ) : embed.$type === "app.bsky.embed.recordWithMedia" ? (
        <div className="flex flex-col items-center justify-center gap-2 mt-2">
          <BlueskyEmbed embed={embed.media} did={did} hasBorder={true} />
          <BlueskyPostWithoutEmbed uri={embed.record.record.uri} />
          <Link
            to="/at:/$handle/$collection/$rkey"
            params={{
              handle: embed.record.record.uri.split("/")[2],
              collection: embed.record.record.uri.split("/")[3],
              rkey: embed.record.record.uri.split("/")[4],
            }}
            className="w-full text-left text-muted-foreground text-sm"
          >
            Visit embed{" "}
            <ArrowRight height="1rem" className="inline-block mb-0.5" />
          </Link>
        </div>
      ) : embed.$type === "app.bsky.embed.record" ? (
        <div className="flex flex-col items-left justify-center gap-2 mt-2 rounded-lg">
          <BlueskyPostWithoutEmbed uri={embed.record.uri} />
        </div>
      ) : (
        <div className="border rounded-lg p-3 mb-3">
          This embed type ({embed.$type}) is not yet implemented.
        </div>
      )}
    </div>
  );
};

export default BlueskyEmbed;

interface PostWithoutEmbedData {
  actorProfile: AppBskyActorGetProfile.Output | null;
  post: AppBskyFeedPost.Record | null;
}

/// A post without an embedded post inside. Will link to the embedded post but will not show it.
export const BlueskyPostWithoutEmbed = ({
  uri,
  showEmbeddedPost = false,
}: {
  uri: string;
  showEmbeddedPost?: boolean;
}) => {
  const [data, setData] = useState<PostWithoutEmbedData>({
    actorProfile: null,
    post: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchRepoData() {
      const splits = uri.split("/");
      const did = splits[splits.length - 3];
      const collection = splits[splits.length - 2];
      const rkey = splits[splits.length - 1];
      try {
        const rpc = new QtClient(new URL("https://public.api.bsky.app"));
        const responsePromise = rpc
          .getXrpcClient()
          .get("com.atproto.repo.getRecord", {
            params: { repo: did, collection, rkey },
            signal: abortController.signal,
          });
        const actorPromise = rpc
          .getXrpcClient()
          .get("app.bsky.actor.getProfile", {
            params: { actor: did },
            signal: abortController.signal,
          });
        const [response, actor] = await Promise.all([
          responsePromise,
          actorPromise,
        ]);
        setData({
          actorProfile: actor.data,
          post: response.data.value as AppBskyFeedPost.Record,
        });
      } catch (err: any) {
        if (err.name === "AbortError") return;

        setData({
          actorProfile: null,
          post: null,
        });
      }
    }

    fetchRepoData();

    return () => {
      abortController.abort();
    };
  }, [uri]);

  if (data.post === null || !data.actorProfile === null) return null;

  const { post, actorProfile } = data;
  const embed = post.embed;

  return (
    <div className="border p-6 pl-3 py-3 rounded-md">
      <div className="flex items-center">
        {actorProfile === undefined ? (
          <div className="w-14 h-1 rounded-full mr-3 bg-muted-foreground animate-pulse" />
        ) : (
          <div className="flex flex-row items-start">
            <img
              src={actorProfile?.avatar}
              alt={actorProfile?.displayName + "'s avatar"}
              className="w-12 h-12 rounded-full mr-3 transition-opacity duration-300"
            />
            <div className="flex flex-col">
              <div className="font-bold">
                {actorProfile?.displayName}{" "}
                <span className="font-normal text-muted-foreground">
                  @{actorProfile?.handle}
                </span>
              </div>
              <SegmentedText text={post.text} facets={post.facets ?? []} />
              <div className={`rounded-lg`}>
                {embed &&
                  (embed.$type === "app.bsky.embed.external" ? (
                    <div
                      className={`flex flex-col items-left justify-center mt-2`}
                    >
                      {embed.external.thumb && (
                        <img
                          src={getBlueskyCdnLink(
                            actorProfile?.did!,
                            embed.external.thumb.ref.$link,
                            "jpeg",
                          )}
                          alt={embed.external.title}
                          className="w-full object-cover rounded-lg mb-2"
                        />
                      )}
                      <h3 className="font-bold pl-2">{embed.external.title}</h3>
                      <p className="text-gray-600 text-sm pl-2 pb-1">
                        {embed.external.description}
                      </p>
                    </div>
                  ) : embed.$type === "app.bsky.embed.images" ? (
                    <div
                      className={`flex flex-col items-center justify-center mt-2`}
                    >
                      <AppBskyEmbedImagesLayout
                        did={actorProfile?.did!}
                        images={embed.images}
                      />
                    </div>
                  ) : embed.$type === "app.bsky.embed.recordWithMedia" ? (
                    <div className="flex flex-col items-center justify-center gap-2 mt-2">
                      <BlueskyEmbed
                        embed={embed.media}
                        did={actorProfile?.did!}
                        hasBorder={true}
                      />
                      {showEmbeddedPost ? (
                        <BlueskyPostWithoutEmbed
                          uri={embed.record.record.uri}
                        />
                      ) : (
                        <Link
                          to="/at:/$handle/$collection/$rkey"
                          params={{
                            handle: embed.record.record.uri.split("/")[2],
                            collection: embed.record.record.uri.split("/")[3],
                            rkey: embed.record.record.uri.split("/")[4],
                          }}
                        >
                          <p className="text-left w-full text-sm text-muted-foreground">
                            There's an embedded post here. Visit it?
                            <ArrowRight
                              height="1rem"
                              className="inline-block mb-0.5"
                            />
                          </p>
                        </Link>
                      )}
                    </div>
                  ) : embed.$type === "app.bsky.embed.record" ? (
                    <div className="flex flex-col items-left justify-center gap-2 mt-2 rounded-lg">
                      {showEmbeddedPost ? (
                        <BlueskyPostWithoutEmbed uri={embed.record.uri} />
                      ) : (
                        <Link
                          to="/at:/$handle/$collection/$rkey"
                          params={{
                            handle: embed.record.uri.split("/")[2],
                            collection: embed.record.uri.split("/")[3],
                            rkey: embed.record.uri.split("/")[4],
                          }}
                        >
                          <p className="text-left w-full text-sm text-muted-foreground">
                            There's an embedded post here. Visit it?
                            <ArrowRight
                              height="1rem"
                              className="inline-block mb-0.5"
                            />
                          </p>
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="border rounded-lg p-3 mb-3">
                      This embed type ({embed.$type}) is not yet implemented. If
                      you have a need, state your case{" "}
                      <Link to="/at:/$handle" params={{ handle: "natalie.sh" }}>
                        @natalie.sh
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="text-sm text-muted-foreground mt-3 pl-[4.25rem]">
        <a
          href={`https://bsky.app/profile/${uri.replace("at://", "").replace("app.bsky.feed.post", "post")}`}
        >
          View on{" "}
          <img
            src="/assets/services/bluesky.png"
            className="mb-1 inline h-4 pl-0.5 grayscale"
            alt="Bluesky"
          />{" "}
          Bluesky
          <ArrowRight height="1rem" className="inline-block mb-0.5" />
        </a>
      </div>
    </div>
  );
};
