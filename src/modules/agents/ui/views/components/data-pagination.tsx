import { Button } from "@/components/ui/button";
import { DEFAULT_PAGE } from "@/constants";

interface Props {
  page: number;
  totalPages: number;
  onPageChnage: (page: number) => void;
}
export const DataPagination = ({ page, totalPages, onPageChnage }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant={"outline"}
          disabled={page === 1}
          size="sm"
          onClick={() => onPageChnage(Math.max(DEFAULT_PAGE, page - 1))}
        >
          Previous
        </Button>
        <Button
          variant={"outline"}
          onClick={() => onPageChnage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages || totalPages === 0}
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
