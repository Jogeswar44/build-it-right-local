import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore, useAuthStore } from "@/store";
import { VegBadge } from "@/components/StatusBadge";

export default function CartPage() {
  const { items, updateQuantity, removeItem, updateNote, clearCart, subtotal, tax, total } = useCartStore();
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <ShoppingBag className="h-16 w-16 text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-display font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some delicious items from the menu!</p>
        <Button asChild><Link to="/menu">Browse Menu</Link></Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
          <Link to="/menu" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Menu
          </Link>
          <h1 className="font-display font-bold text-foreground">Cart</h1>
          <div className="flex items-center gap-4">
            <button onClick={clearCart} className="text-sm text-destructive hover:underline">Clear</button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive text-sm px-2">
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="space-y-4 mb-8">
          {items.map(({ menuItem, quantity, specialNote }) => (
            <div key={menuItem.id} className="rounded-xl border border-border bg-card p-4">
              <div className="flex gap-3">
                <img src={menuItem.imageUrl} alt={menuItem.name} className="h-20 w-20 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <VegBadge isVeg={menuItem.isVeg} />
                      <h3 className="font-display font-bold text-sm text-foreground mt-1">{menuItem.name}</h3>
                      <p className="text-sm text-muted-foreground">₹{menuItem.price}</p>
                    </div>
                    <button onClick={() => removeItem(menuItem.id)} className="text-muted-foreground hover:text-destructive p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="secondary" className="h-7 w-7" onClick={() => updateQuantity(menuItem.id, quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-bold w-5 text-center">{quantity}</span>
                      <Button size="icon" className="h-7 w-7" onClick={() => updateQuantity(menuItem.id, quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-display font-bold text-foreground">₹{menuItem.price * quantity}</span>
                  </div>
                </div>
              </div>
              <Input
                className="mt-3 text-xs"
                placeholder="Special instructions (optional)"
                value={specialNote}
                onChange={(e) => updateNote(menuItem.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display font-bold text-foreground mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span><span>₹{subtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Tax (5%)</span><span>₹{tax().toFixed(2)}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-display font-bold text-foreground text-lg">
              <span>Total</span><span>₹{total().toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full mt-6" size="lg" onClick={() => navigate("/payment")}>
            Proceed to Payment
          </Button>
        </div>
      </main>
    </div>
  );
}
