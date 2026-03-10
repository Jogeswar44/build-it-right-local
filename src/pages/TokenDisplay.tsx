import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mockOrders } from "@/data/mock";

export default function TokenDisplay() {
  const [readyTokens, setReadyTokens] = useState(
    mockOrders.filter((o) => o.status === "READY").map((o) => ({
      token: o.tokenNumber,
      name: o.studentName.split(" ")[0],
    }))
  );

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(160,10%,5%)] text-[hsl(160,10%,95%)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-[hsl(160,10%,15%)]">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            <span className="text-[hsl(145,80%,45%)]">CCMS</span> · Token Display
          </h1>
          <p className="text-sm text-[hsl(160,10%,50%)]">Collect your order when your token appears</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-display font-bold font-mono tracking-wider">
            {time.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </p>
          <p className="text-xs text-[hsl(160,10%,50%)]">{time.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}</p>
        </div>
      </div>

      {/* Tokens */}
      <div className="flex-1 flex items-center justify-center p-8">
        {readyTokens.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            <AnimatePresence mode="popLayout">
              {readyTokens.map(({ token, name }) => (
                <motion.div
                  key={token}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="rounded-2xl border-2 border-[hsl(145,80%,45%)] bg-[hsl(145,80%,45%,0.08)] p-8 text-center shadow-[0_0_30px_hsl(145,80%,45%,0.15)]"
                >
                  <p className="text-5xl md:text-6xl font-display font-bold text-[hsl(145,80%,45%)] tracking-wider">
                    {token.split("-").pop()}
                  </p>
                  <p className="text-lg text-[hsl(160,10%,60%)] mt-2 font-mono">{token}</p>
                  <p className="text-sm text-[hsl(160,10%,45%)] mt-1">{name}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-3xl font-display font-bold text-[hsl(160,10%,30%)]">No tokens ready</p>
            <p className="text-[hsl(160,10%,25%)] mt-2">Orders will appear here when ready for collection</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-8 py-3 border-t border-[hsl(160,10%,15%)] flex items-center justify-between text-xs text-[hsl(160,10%,30%)]">
        <span>College Canteen Management System</span>
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[hsl(145,80%,45%)] animate-pulse" />
          Live · Auto-updating
        </span>
      </div>
    </div>
  );
}
