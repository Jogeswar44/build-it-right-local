import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdminRegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      id: `usr-${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: "ADMIN",
      password: form.password,
    };

    const storedUsers = JSON.parse(localStorage.getItem("ccms_users") || "[]");
    const userExists = storedUsers.find((u: any) => u.email === form.email);
    
    if (userExists) {
      toast.error("User with this email already exists!");
      return;
    }

    localStorage.setItem("ccms_users", JSON.stringify([...storedUsers, newUser]));

    toast.success("Admin registration successful! Please sign in.");
    navigate("/admin/login");
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/admin/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Admin Login
        </Link>
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Registration</h1>
            <p className="text-sm text-muted-foreground mt-1">Register for an admin account</p>
          </div>
          
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Admin Name" value={form.name} onChange={update("name")} required />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Email</Label>
              <Input id="reg-email" type="email" placeholder="admin@college.edu" value={form.email} onChange={update("email")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="9876543210" value={form.phone} onChange={update("phone")} required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-pass">Password</Label>
              <Input id="reg-pass" type="password" placeholder="••••••••" value={form.password} onChange={update("password")} required />
            </div>
            <Button type="submit" className="w-full" size="lg">Create Account</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an admin account?{" "}
            <Link to="/admin/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
