import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";

interface LinkData {
  links: {
    [key: string]: {
      [key: string]: {
        records: number;
        distinct_dids: number;
      };
    };
  };
}

export function AllBacklinksViewer({ aturi }: { aturi: string }) {
  const [data, setData] = useState<LinkData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://constellation.microcosm.blue/links/all?target=${encodeURIComponent(aturi)}`,
        );
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchData();
  }, [aturi]);

  if (loading) {
    return (
      <>
        <h2 className="text-xl font-bold">Backlinks</h2>
        <div className="grid gap-4 mt-4 md:grid-cols-1 lg:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <Card className="m-4">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <>
      <h2 className="text-2xl pt-6 font-semibold leading-3">Backlinks</h2>
      <div className="text-sm text-muted-foreground">
        Interaction Statistics from{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://constellation.microcosm.blue/"
          target="_blank"
          rel="noopener noreferrer"
        >
          constellation
        </a>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 leading-snug">
        {Object.entries(data.links).map(([category, stats]) => (
          <Card key={category} className="flex flex-col">
            <CardContent className="flex-1 mt-4">
              <CardTitle className="mb-2">
                {formatCategoryName(category)}
              </CardTitle>
              <div className="space-y-4">
                {Object.entries(stats).map(([stat, values]) => (
                  <div key={stat} className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground break-words overflow-hidden max-w-full">
                      {formatStatName(stat)}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <Link
                        to={"/constellation/links/$collection"}
                        params={{
                          collection: category,
                        }}
                        search={{
                          path: stat,
                          target: aturi,
                        }}
                        className="flex justify-between text-blue-700 dark:text-blue-300"
                      >
                        <span>Records:</span>
                        <span>
                          <span className="font-medium">{values.records}</span>
                          <span className="border-l w-0 ml-2" />
                        </span>
                      </Link>
                      <div className="flex justify-between">
                        <Link
                          to={"/constellation/dids/$collection"}
                          params={{
                            collection: category,
                          }}
                          search={{
                            path: stat,
                            target: aturi,
                          }}
                          className="flex justify-between w-full text-blue-700 dark:text-blue-300"
                        >
                          <span>Distinct DIDs:</span>
                          <span className="font-medium">
                            {values.distinct_dids}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {Object.entries(data.links).length == 0 && (
          <div className="flex flex-col items-start justify-start">
            <p className="text-muted-foreground w-max">
              Nothing doing! No links indexed for this target!
            </p>
            <span className="text-muted-foreground text-xs">
              You can{" "}
              <a
                href={`https://constellation.microcosm.blue/links/all?target=${encodeURIComponent(aturi)}`}
                className="text-blue-500 hover:underline"
              >
                view the api response
              </a>
              .
            </span>
          </div>
        )}
      </div>
    </>
  );
}

// Helper function to format category names
const formatCategoryName = (name: string) => {
  return name
    .split(".")
    .pop()
    ?.replace(/([A-Z])/g, " $1")
    .trim();
};

// Helper function to format stat names
const formatStatName = (name: string) => {
  return name.split(".").filter(Boolean).join(".");
};

export default AllBacklinksViewer;
