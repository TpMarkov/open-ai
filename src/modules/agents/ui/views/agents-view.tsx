"use client";
import { useTRPC } from "@/trpc/client";

import React from "react";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "./components/data-pagination";
import { useRouter } from "next/navigation";

const AgentsView = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilters();
  const router = useRouter();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    })
  );

  // Without prefetching
  // const trpc = useTRPC();
  // const { data, isLoading, isError } = useQuery(
  //   trpc.agents.getMany.queryOptions({
  //     pageSize: 1,
  //   })
  // );

  // if (isLoading)
  //   return <LoadingState title="Loading agents" description="Please wait..." />;
  // if (isError)
  //   return <ErrorState title="Error" description="Failed to load agents." />;

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {" "}
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data?.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings. Each agent will follow your instructions and can interact with participants during the call."
        />
      )}
    </div>
  );
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
