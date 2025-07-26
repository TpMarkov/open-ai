import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-dash-form";

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
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
