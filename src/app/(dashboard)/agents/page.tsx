import { auth } from "@/lib/auth";
import AgentsView from "@/modules/agents/ui/views/agents-view"; // AgentsViewError, // AgentsLoadingView,
import { AgentsListHeader } from "@/modules/agents/ui/views/components/list-header";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AgentsLoadingView } from "@/modules/agents/ui/views/agents-view";
import { AgentsViewError } from "@/modules/agents/ui/views/agents-view";

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({}));

  return (
    <>
      <AgentsListHeader></AgentsListHeader>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsLoadingView />}>
          <ErrorBoundary fallback={<AgentsViewError></AgentsViewError>}>
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
