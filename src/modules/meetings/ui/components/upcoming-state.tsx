import { EmptyState } from "@/components/empty-state";
import { VideoIcon, BanIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelling,
}: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will apear here"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
        <Button
          disabled={isCancelling}
          onClick={onCancelMeeting}
          variant={"secondary"}
          className="w-full lf:w-auto"
        >
          <BanIcon />
          Cancel meeting
        </Button>
        <Button disabled={isCancelling} className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon></VideoIcon>
          </Link>
          Start meeting
        </Button>
      </div>
    </div>
  );
};
