import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore } from "@/store";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", rollNumber: "", department: "", yearOfStudy: "", password: "" });
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: "usr-new", name: form.name, email: form.email, phone: form.phone,
      role: "STUDENT", rollNumber: form.rollNumber, department: form.department, yearOfStudy: parseInt(form.yearOfStudy),
    });
    navigate("/menu");
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-display font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Register as a new student</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={form.name} onChange={update("name")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-email">Email</Label>
              <Input id="reg-email" type="email" placeholder="you@college.edu" value={form.email} onChange={update("email")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="9876543210" value={form.phone} onChange={update("phone")} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="roll">Roll Number</Label>
                <Input id="roll" placeholder="CS2024001" value={form.rollNumber} onChange={update("rollNumber")} required />
              </div>
              <div className="space-y-1.5">
                <Label>Year</Label>
                <Select value={form.yearOfStudy} onValueChange={(v) => setForm((f) => ({ ...f, yearOfStudy: v }))}>
                  <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4].map((y) => <SelectItem key={y} value={String(y)}>Year {y}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dept">Department</Label>
              <Input id="dept" placeholder="Computer Science" value={form.department} onChange={update("department")} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reg-pass">Password</Label>
              <Input id="reg-pass" type="password" placeholder="••••••••" value={form.password} onChange={update("password")} required />
            </div>
            <Button type="submit" className="w-full" size="lg">Create Account</Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
