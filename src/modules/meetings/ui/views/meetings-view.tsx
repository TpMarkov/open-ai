"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
      <div className="overflow-x-scroll">{JSON.stringify(data, null, 2)};</div>
    </div>
  );
};

export const MeetingsLoadingView = () => {
  return (
    <LoadingState
      title="Loading meetings"
      description="Please wait this might take a few seconds"
    />
  );
};

export const MeetingsErrorView = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Something went wrong"
    />
  );
};
