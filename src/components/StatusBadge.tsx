import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold",
  {
    variants: {
      status: {
        PENDING: "bg-status-pending-bg text-status-pending-text",
        PREPARING: "bg-status-preparing-bg text-status-preparing-text",
        READY: "bg-status-ready-bg text-status-ready-text",
        COLLECTED: "bg-status-collected-bg text-status-collected-text",
        CANCELLED: "bg-status-cancelled-bg text-status-cancelled-text",
      },
    },
    defaultVariants: { status: "PENDING" },
  }
);

interface StatusBadgeProps extends VariantProps<typeof statusBadgeVariants> {
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(statusBadgeVariants({ status }), className)}>
      {status}
    </span>
  );
}

export function VegBadge({ isVeg }: { isVeg: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span className={cn("h-2 w-2 rounded-full", isVeg ? "bg-veg" : "bg-nonveg")} />
      {isVeg ? "Veg" : "Non-Veg"}
    </span>
  );
}
