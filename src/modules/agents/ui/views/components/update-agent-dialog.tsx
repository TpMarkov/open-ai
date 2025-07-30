import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-dash-form";
import { AgentGetOne } from "@/modules/agents/types";

interface NewAgentDialogProp {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}
export const UpdateAgentDialog = ({
  open,
  onOpenChange,
  initialValues,
}: NewAgentDialogProp) => {
  return (
    <ResponsiveDialog
      title="Edit Agent"
      description="Edit the agent details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
