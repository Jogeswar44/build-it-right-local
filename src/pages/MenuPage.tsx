import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Star, Plus, Minus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VegBadge } from "@/components/StatusBadge";
import { useCartStore, useAuthStore } from "@/store";
import { mockMenuItems } from "@/data/mock";
import { Link, useNavigate } from "react-router-dom";
import type { MenuCategory, MenuItem } from "@/types";

const categories: { label: string; value: MenuCategory | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Breakfast", value: "BREAKFAST" },
  { label: "Lunch", value: "LUNCH" },
  { label: "Dinner", value: "DINNER" },
  { label: "Snacks", value: "SNACKS" },
  { label: "Beverages", value: "BEVERAGES" },
];

function FoodCard({ item }: { item: MenuItem }) {
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const qty = cartItem?.quantity || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative h-40 overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="text-sm font-bold text-card">Sold Out</span>
          </div>
        )}
        {item.isAvailable && item.stockQty <= item.lowStockThreshold && (
          <div className="absolute top-2 right-2 bg-status-preparing-bg text-status-preparing-text text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Low Stock
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <VegBadge isVeg={item.isVeg} />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-warning text-warning" />
            {item.rating} ({item.reviewCount})
          </div>
        </div>
        <h3 className="font-display font-bold text-foreground text-sm mt-2">{item.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-display font-bold text-foreground">₹{item.price}</span>
          {item.isAvailable && (
            qty === 0 ? (
              <Button size="sm" onClick={() => addItem(item)}>
                <Plus className="h-4 w-4" /> Add
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => qty === 1 ? removeItem(item.id) : updateQuantity(item.id, qty - 1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-bold w-5 text-center">{qty}</span>
                <Button size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, qty + 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<MenuCategory | "ALL">("ALL");
  const [vegOnly, setVegOnly] = useState(false);
  const itemCount = useCartStore((s) => s.itemCount());
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filtered = mockMenuItems.filter((item) => {
    if (category !== "ALL" && item.category !== category) return false;
    if (vegOnly && !item.isVeg) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">
          <Link to="/" className="font-display font-bold text-xl text-gradient-brand">CCMS</Link>
          <div className="flex items-center gap-3">
            <Link to="/track" className="text-sm text-muted-foreground hover:text-foreground">My Orders</Link>
            <Link to="/cart" className="relative">
              <Button variant="secondary" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search menu..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === c.value
                    ? "bg-primary text-primary-foreground shadow-brand"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {c.label}
              </button>
            ))}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                vegOnly ? "bg-veg/10 text-veg ring-1 ring-veg" : "bg-secondary text-secondary-foreground"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-veg" /> Veg Only
            </button>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((item) => <FoodCard key={item.id} item={item} />)}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium">No items found</p>
            <p className="text-sm">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}
