import { Link, useNavigate } from "react-router-dom";
import { BarChart3, ShoppingBag, Users, UtensilsCrossed, Clock, TrendingUp, AlertTriangle, Settings, LogOut } from "lucide-react";
import { mockOrders, mockMenuItems } from "@/data/mock";
import { useAuthStore } from "@/store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const stats = [
  { label: "Today's Revenue", value: "₹12,450", icon: TrendingUp, trend: "+12%" },
  { label: "Active Orders", value: "5", icon: ShoppingBag, trend: "" },
  { label: "Menu Items", value: String(mockMenuItems.length), icon: UtensilsCrossed, trend: "" },
  { label: "Avg Wait Time", value: "8 min", icon: Clock, trend: "-2 min" },
];

const recentOrders = mockOrders.slice(0, 5);

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "ADMIN") {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const lowStock = mockMenuItems.filter((i) => i.stockQty <= i.lowStockThreshold && i.isAvailable);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-display font-bold text-xl text-gradient-brand">CCMS</Link>
            <span className="text-sm text-muted-foreground">Admin</span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/admin" className="text-foreground font-medium">Dashboard</Link>
            <button onClick={() => toast.info("Menu management coming soon!")} className="text-muted-foreground hover:text-foreground bg-transparent border-none p-0 cursor-pointer">Menu</button>
            <button onClick={() => toast.info("Staff management coming soon!")} className="text-muted-foreground hover:text-foreground bg-transparent border-none p-0 cursor-pointer">Staff</button>
            <button onClick={() => toast.info("Orders history coming soon!")} className="text-muted-foreground hover:text-foreground bg-transparent border-none p-0 cursor-pointer">Orders</button>
            <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" onClick={() => toast.info("Settings coming soon!")} />
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-muted-foreground hover:text-destructive h-8 w-8 ml-2">
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-display font-bold text-foreground">{s.value}</span>
                {s.trend && <span className="text-xs text-success font-medium mb-1">{s.trend}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-card p-6">
            <h2 className="font-display font-bold text-foreground mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <span className="font-display font-bold text-primary text-sm">{order.tokenNumber}</span>
                    <p className="text-xs text-muted-foreground">{order.studentName} · {order.items.length} items</p>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-bold text-sm text-foreground">₹{order.total.toFixed(0)}</span>
                    <p className={`text-xs font-bold ${
                      order.status === "READY" ? "text-status-ready-text" : 
                      order.status === "PREPARING" ? "text-status-preparing-text" : 
                      "text-status-pending-text"
                    }`}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <h2 className="font-display font-bold text-foreground">Low Stock</h2>
            </div>
            {lowStock.length > 0 ? (
              <div className="space-y-3">
                {lowStock.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <span className="text-xs font-bold bg-status-preparing-bg text-status-preparing-text px-2 py-0.5 rounded-full">
                      {item.stockQty} left
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">All items well stocked</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
