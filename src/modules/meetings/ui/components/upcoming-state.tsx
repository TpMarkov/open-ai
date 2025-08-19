import { EmptyState } from "@/components/empty-state";
import { VideoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
}

export const UpcomingState = ({ meetingId }: Props) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Not started yet"
        description="Once you start this meeting, a summary will apear here"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
        {/* <Button
          disabled={isCancelling}
          onClick={onCancelMeeting}
          variant={"secondary"}
          className="w-full lf:w-auto"
        >
          <BanIcon />
          Cancel meeting
        </Button> */}
        <Link href={`/call/${meetingId}`}>
          <Button className="w-full lg:w-auto">
            <VideoIcon></VideoIcon>
            Start meeting
          </Button>
        </Link>
      </div>
    </div>
  );
};
