"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

import React from "react";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useQuery } from "@tanstack/react-query";

const AgentsView = () => {
  // const trpc = useTRPC();
  // const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  // Without prefetching
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions({})
  );

  if (isLoading)
    return <LoadingState title="Loading agents" description="Please wait..." />;
  if (isError)
    return <ErrorState title="Error" description="Failed to load agents." />;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default AgentsView;

export const AgentsLoadingView = () => {
  return (
    <LoadingState
      title="Loading agents"
      description="Please wait this might take a few seconds"
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Agents"
      description="Something went wrong"
    />
  );
};
