import { CircleAlert, Undo } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "@tanstack/react-router";
import { SmartSearchBar } from "./smartSearchBar";

export default function ShowError({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <div className="flex flex-col max-h-[calc(100vh-5rem)] h-screen justify-center items-center gap-4">
      <div className="flex flex-col gap-2 items-center">
        <CircleAlert className="text-red-500" width={48} height={48} />
        <div className="h-min text-wrap break-words max-w-md w-full text-center">
          {error.message}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <Button variant="secondary" onClick={() => router.history.back()}>
          Go back <Undo />
        </Button>
        <div>or</div>
        <div className="w-48">
          <SmartSearchBar isKeybindEnabled={false} />
        </div>
      </div>
    </div>
  );
}
