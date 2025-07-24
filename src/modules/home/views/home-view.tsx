"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div className="h-full justify-center">
        <div className="flex h-[100vh] items-center justify-center size-full">
          <Loader
            className="animate-spin text-green-700 size-7"
            aria-label="Loading..."
          />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user?.name || "Unknown User"}</p>{" "}
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/sign-in") },
          })
        }
      >
        Sign out
      </Button>
    </div>
  );
};
