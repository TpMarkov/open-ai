"use client";
import React from "react";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilter();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );

  return (
    <div>
      <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
        <DataTable
          data={data.items}
          columns={columns}
          onRowClick={(row) => router.push(`/meetings/${row.id}`)}
        />
        <DataPagination
          totalPages={data.totalPages}
          page={filters.page}
          onPageChange={(page) => setFilters({ page })}
        ></DataPagination>
        {data.items.length === 0 && (
          <EmptyState
            title="Create your first meeting"
            description="Schedule a meeting to connect with others. Each meeting lets you collaborate, share ideas, and interact with participants in real time."
          />
        )}
      </div>
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
