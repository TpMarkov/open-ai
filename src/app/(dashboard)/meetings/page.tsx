import { auth } from "@/lib/auth";
import { MeetingsListHeader } from "@/modules/meetings/ui/components/list-header";
import {
  MeetingsErrorView,
  MeetingsLoadingView,
  MeetingsView,
} from "@/modules/meetings/ui/views/meetings-view";
import type { SearchParams } from "nuqs";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearcParams } from "@/modules/meetings/params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const page = async ({ searchParams }: Props) => {
  const filters = await loadSearcParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <>
      <MeetingsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingsLoadingView />}>
          <ErrorBoundary fallback={<MeetingsErrorView />}>
            <MeetingsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
