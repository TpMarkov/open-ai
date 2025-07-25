import { ResponsiveDialog } from "@/components/responsive-dialog";

interface NewAgentDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProp) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      new agent form
    </ResponsiveDialog>
  );
};
