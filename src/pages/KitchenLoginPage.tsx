import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function KitchenLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("ccms_users") || "[]");
    const foundUser = storedUsers.find((u: any) => u.email === email && u.role === "KITCHEN");

    if (foundUser) {
      if (foundUser.password !== password) {
        toast.error("Invalid credentials.");
        return;
      }

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

    if (email === "kitchen@ccms.edu" && password === "kitchen123") {
      setUser({
        id: "usr-kitchen", name: "Kitchen Staff", email, phone: "0000000000",
        role: "KITCHEN", rollNumber: "", department: "", yearOfStudy: 0,
      });
      toast.success("Welcome Kitchen");
      navigate("/kitchen");
      return;
    }

    toast.error("Kitchen user not found. Please contact administration.");
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
            <p className="text-sm text-muted-foreground mt-1">Access the kitchen order management panel</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="kitchen@ccms.edu" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" size="lg">Sign In</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have a kitchen account?{" "}
            <Link to="/kitchen/register" className="text-primary font-medium hover:underline">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
