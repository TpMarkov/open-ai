"use client";

import { AgentGetMany } from "@/modules/agents/types";
import { ColumnDef } from "@tanstack/react-table";
import GeneratedAvatar from "@/components/generated-avatar";
import { CornerDownRightIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AgentGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            seed={row.original.name}
            variant="botttsNeutral"
            className="size-6"
            // alt={`Avatar for ${row.original.name}`}
          ></GeneratedAvatar>{" "}
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700"></VideoIcon>
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "meeting" : "meetings"}{" "}
      </Badge>
    ),
  },
];
