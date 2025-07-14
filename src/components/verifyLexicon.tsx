import { Check, X } from "lucide-react";
import { useState, useEffect } from "react";

const LexiconResolver = ({
  lexiconId,
  did,
}: {
  lexiconId: string;
  did: string;
}) => {
  const [resolved, setResolved] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveLexicon = (id: string) => {
    if (!id) return "";

    const parts = id.split(".");
    const domainParts = [];
    let i = 0;
    while (i < parts.length) {
      domainParts.push(parts[i]);
      i++;
    }
    const reversedDomain = domainParts.reverse();
    const pathParts = parts.slice(i + 1);

    return [
      "_lexicon",
      ...reversedDomain.slice(1, Infinity),
      ...pathParts,
    ].join(".");
  };

  const verifyDohRecord = async (dohString: string) => {
    try {
      setIsLoading(true);
      setError(null);

      // Using Google's DNS-over-HTTPS API
      const response = await fetch(
        `https://dns.google/resolve?name=${dohString}&type=TXT`,
      );

      if (!response.ok) {
        throw new Error("DNS lookup failed");
      }

      const data = await response.json();

      // Check if we got any TXT records
      if (data.Answer && data.Answer.length > 0) {
        // TXT record exists
        setIsValid(false);
        data.Answer.forEach((record: { data: string }) => {
          if (record.data === `did=${did}`) setIsValid(true);
        });
        return true;
      } else {
        setIsValid(false);
        return false;
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setIsValid(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (lexiconId) {
      const dohString = resolveLexicon(lexiconId);
      setResolved(dohString);
      verifyDohRecord(dohString);
    }
  }, [lexiconId]);

  return (
    <div>
      {isLoading && <p>Verifying...</p>}
      {isValid !== null && !isLoading && (
        <p>
          Lexicon status:{" "}
          {isValid ? (
            <>
              <Check className="inline text-green-500 h-6 pb-1" /> Verified
            </>
          ) : (
            <>
              <X className="inline text-red-500 h-6 pb-1" /> Not verified
            </>
          )}{" "}
          <span className="inline text-muted-foreground border-r pl-1 mr-2" />{" "}
          <a
            href={`https://dns.google/resolve?name=${resolved}&type=TXT`}
            target="_blank"
            className="text-blue-700 dark:text-blue-400 hover:underline"
          >
            {resolved}
          </a>
        </p>
      )}{" "}
      {isLoading && <p>Verifying lexicon</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default LexiconResolver;
