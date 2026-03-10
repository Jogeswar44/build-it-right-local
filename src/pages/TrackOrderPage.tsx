import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { StatusBadge, VegBadge } from "@/components/StatusBadge";
import { mockOrders } from "@/data/mock";
import { Button } from "@/components/ui/button";

const steps = ["PENDING", "PREPARING", "READY", "COLLECTED"] as const;

function OrderStepper({ status }: { status: string }) {
  const activeIndex = steps.indexOf(status as typeof steps[number]);
  return (
    <div className="flex items-center gap-1 mt-3">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-1 flex-1">
          <div className={`h-1.5 rounded-full flex-1 transition-colors ${i <= activeIndex ? "bg-primary" : "bg-muted"}`} />
        </div>
      ))}
    </div>
  );
}

export default function TrackOrderPage() {
  const myOrders = mockOrders.filter((o) => o.status !== "COLLECTED" && o.status !== "CANCELLED");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
          <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Menu
          </Link>
          <h1 className="font-display font-bold text-foreground">My Orders</h1>
          <div />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {myOrders.map((order) => (
          <div key={order.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display font-bold text-primary text-lg">{order.tokenNumber}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {Math.round((Date.now() - order.createdAt.getTime()) / 60000)} min ago
                </div>
              </div>
              <StatusBadge status={order.status} />
            </div>
            <OrderStepper status={order.status} />
            <div className="mt-4 space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <VegBadge isVeg={item.menuItem.isVeg} />
                    <span className="text-foreground">{item.menuItem.name} × {item.quantity}</span>
                  </div>
                  <span className="text-muted-foreground">₹{item.menuItem.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-3 pt-3 flex justify-between text-sm font-display font-bold">
              <span>Total</span><span>₹{order.total.toFixed(2)}</span>
            </div>
            {order.status === "PENDING" && (
              <Button variant="destructive" size="sm" className="mt-3 w-full">Cancel Order</Button>
            )}
          </div>
        ))}

        {myOrders.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No active orders</p>
            <Button className="mt-4" asChild><Link to="/menu">Order Now</Link></Button>
          </div>
        )}
      </main>
    </div>
  );
}
