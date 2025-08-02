import {
  CircleXIcon,
  CircleCheckIcon,
  VideoIcon,
  LoaderIcon,
  ClockArrowUpIcon,
} from "lucide-react";

import { CommandSelect } from "./command-select";

import { MeetingStatus } from "../../types";
import { useMeetingsFilter } from "../../hooks/use-meetings-filters";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon></ClockArrowUpIcon>
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon></CircleCheckIcon>
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon></VideoIcon>
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon></LoaderIcon>
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Canceled,
    value: MeetingStatus.Canceled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon></CircleXIcon>
        {MeetingStatus.Canceled}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useMeetingsFilter();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      value={filters.status ?? ""}
    />
  );
};
