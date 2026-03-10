import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ChefHat, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge, VegBadge } from "@/components/StatusBadge";
import { mockOrders, mockMenuItems } from "@/data/mock";
import type { Order, OrderStatus } from "@/types";

const columns: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: "PENDING", label: "New Orders", icon: <Clock className="h-4 w-4" /> },
  { status: "PREPARING", label: "Preparing", icon: <ChefHat className="h-4 w-4" /> },
  { status: "READY", label: "Ready", icon: <span className="text-base">✅</span> },
];

function OrderTicket({ order, onUpdateStatus }: { order: Order; onUpdateStatus: (id: string, status: OrderStatus) => void }) {
  const elapsed = Math.round((Date.now() - order.createdAt.getTime()) / 60000);
  const nextStatus: Record<string, OrderStatus> = { PENDING: "PREPARING", PREPARING: "READY", READY: "COLLECTED" };

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-bold text-primary text-sm">{order.tokenNumber}</span>
        <span className="text-xs text-muted-foreground">{elapsed}m ago</span>
      </div>
      <p className="text-xs text-muted-foreground mb-2">{order.studentName}</p>
      <div className="space-y-1.5">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <VegBadge isVeg={item.menuItem.isVeg} />
            <span className="text-foreground flex-1">{item.menuItem.name}</span>
            <span className="text-muted-foreground">×{item.quantity}</span>
          </div>
        ))}
      </div>
      {order.items.some((i) => i.specialNote) && (
        <div className="mt-2 rounded bg-warning/10 px-2 py-1 text-xs text-warning-foreground">
          {order.items.filter((i) => i.specialNote).map((i) => i.specialNote).join(", ")}
        </div>
      )}
      {nextStatus[order.status] && (
        <Button
          className="w-full mt-3"
          size="sm"
          variant={order.status === "PREPARING" ? "success" : order.status === "PENDING" ? "warning" : "default"}
          onClick={() => onUpdateStatus(order.id, nextStatus[order.status])}
        >
          Mark {nextStatus[order.status]}
        </Button>
      )}
    </div>
  );
}

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  };

  const lowStockItems = mockMenuItems.filter((i) => i.stockQty <= i.lowStockThreshold && i.isAvailable);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display font-bold text-xl text-gradient-brand">CCMS</Link>
            <span className="text-sm text-muted-foreground">Kitchen Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            {lowStockItems.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-status-preparing-text bg-status-preparing-bg px-3 py-1 rounded-full">
                <AlertTriangle className="h-3 w-3" /> {lowStockItems.length} low stock
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(({ status, label, icon }) => {
            const col = orders.filter((o) => o.status === status);
            return (
              <div key={status}>
                <div className="flex items-center gap-2 mb-4">
                  {icon}
                  <h2 className="font-display font-bold text-foreground">{label}</h2>
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-bold text-muted-foreground">{col.length}</span>
                </div>
                <div className="space-y-3">
                  {col.map((order) => (
                    <OrderTicket key={order.id} order={order} onUpdateStatus={updateStatus} />
                  ))}
                  {col.length === 0 && (
                    <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                      No orders
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
