import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useAuthStore } from "@/store";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

export default function PaymentPage() {
  const [step, setStep] = useState<"review" | "otp" | "success">("review");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180);
  const [sending, setSending] = useState(false);
  const { subtotal, tax, total, clearCart, items } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const tokenNumber = `CNT-20260310-${String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")}`;

  useEffect(() => {
    if (step !== "otp" || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [step, timer]);

  const handleSendOtp = () => {
    setSending(true);
    setTimeout(() => { 
      setSending(false); 
      setStep("otp"); 
      setTimer(180); 
      toast.success("Mock OTP '123456' sent to your email!");
    }, 1500);
  };

  const handleVerify = () => {
    if (otp.length === 6) {
      if (user) {
        const newOrder = {
          id: `ord-${Date.now()}`,
          studentId: user.id || "unknown",
          studentName: user.name || "Unknown Student",
          tokenNumber: tokenNumber,
          items: [...items],
          status: "PENDING",
          total: total(),
          createdAt: new Date().toISOString(),
        };

        const existingOrders = JSON.parse(localStorage.getItem("ccms_orders") || "[]");
        localStorage.setItem("ccms_orders", JSON.stringify([...existingOrders, newOrder]));
      }

      setStep("success");
      clearCart();
    }
  };

  if (items.length === 0 && step !== "success") {
    navigate("/menu");
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {step === "review" && (
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
            <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Cart
            </Link>
            <h1 className="text-2xl font-display font-bold text-foreground mb-6">Payment</h1>
            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between text-muted-foreground"><span>Items ({items.length})</span><span>₹{subtotal().toFixed(2)}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tax (5%)</span><span>₹{tax().toFixed(2)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-display font-bold text-foreground text-lg">
                <span>Total</span><span>₹{total().toFixed(2)}</span>
              </div>
            </div>
            <div className="rounded-lg bg-muted p-4 mb-6 flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">OTP Verification</p>
                <p className="text-xs text-muted-foreground">A 6-digit OTP will be sent to your registered email to confirm this order.</p>
              </div>
            </div>
            <Button className="w-full" size="lg" onClick={handleSendOtp} disabled={sending}>
              {sending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending OTP...</> : "Send OTP"}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">Enter OTP</h1>
            <p className="text-sm text-muted-foreground mb-6">Check your email for the 6-digit code</p>
            <div className="flex justify-center mb-4">
              <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                <InputOTPGroup>
                  {[0,1,2,3,4,5].map((i) => <InputOTPSlot key={i} index={i} />)}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Expires in <span className="font-mono font-bold text-foreground">{Math.floor(timer/60)}:{String(timer%60).padStart(2,"0")}</span>
            </p>
            <Button className="w-full" size="lg" onClick={handleVerify} disabled={otp.length !== 6}>
              Verify & Place Order
            </Button>
            <button onClick={() => { setOtp(""); setTimer(180); }} className="mt-4 text-sm text-primary hover:underline">
              Resend OTP
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="rounded-xl border border-border bg-card p-8 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-sm text-muted-foreground mb-6">Your food is being prepared</p>
            <div className="rounded-lg bg-muted p-6 mb-6">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Your Token</p>
              <p className="text-3xl font-display font-bold text-primary">{tokenNumber}</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full" asChild><Link to="/track">Track Order</Link></Button>
              <Button variant="ghost" className="w-full" asChild><Link to="/menu">Order More</Link></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
