import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function KitchenLoginPage() {
  const [accessId, setAccessId] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (accessId.length !== 7) {
      toast.error("Access ID must be exactly 7 digits.");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("ccms_users") || "[]");
    const foundUser = storedUsers.find((u: any) => u.id === accessId && u.role === "KITCHEN");

    if (foundUser) {
      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        role: "KITCHEN",
        rollNumber: "",
        department: "",
        yearOfStudy: 0,
      });

      toast.success("Welcome Kitchen Staff");
      navigate("/kitchen");
      return;
    }

    // Default hardcoded simple fallback if needed
    if (accessId === "1234567") {
      setUser({
        id: "usr-kitchen", name: "Kitchen Staff", email: "kitchen@ccms.edu", phone: "0000000000",
        role: "KITCHEN", rollNumber: "", department: "", yearOfStudy: 0,
      });
      toast.success("Welcome Kitchen (Fallback Account)");
      navigate("/kitchen");
      return;
    }

    toast.error("Invalid Access ID. Please ask an Admin to generate one.");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-bold text-foreground">Kitchen Login</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your 7-digit Access ID</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessId">Access ID</Label>
              <Input 
                id="accessId" 
                type="text" 
                placeholder="e.g. 7654321" 
                maxLength={7}
                value={accessId} 
                onChange={(e) => setAccessId(e.target.value.replace(/\D/g, ''))} 
                required 
                className="font-mono text-center tracking-widest text-lg"
              />
            </div>
            <Button type="submit" className="w-full" size="lg">Sign In</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
