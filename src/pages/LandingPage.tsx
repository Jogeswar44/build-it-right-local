import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { GraduationCap, ChefHat, Settings, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  { icon: GraduationCap, label: "Student", desc: "Browse menu, order food & track delivery", path: "/login", color: "from-orange-500 to-amber-400" },
  { icon: ChefHat, label: "Kitchen Staff", desc: "Manage orders & update preparation status", path: "/kitchen/login", color: "from-emerald-500 to-green-400" },
  { icon: Settings, label: "Admin", desc: "Manage menu, staff, analytics & settings", path: "/admin/login", color: "from-blue-500 to-indigo-400" },
  { icon: Monitor, label: "Token Display", desc: "Public screen showing ready orders", path: "/display", color: "from-violet-500 to-purple-400" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Canteen is Open</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
            <span className="text-gradient-brand">CCMS</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium mb-1">
            College Canteen Management System
          </p>
          <p className="text-muted-foreground">
            Order food from your phone. No queues. No cash. Just your token number.
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
          {roles.map((role, i) => (
            <motion.div
              key={role.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <Link to={role.path} className="block group">
                <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${role.color} text-primary-foreground shadow-md`}>
                    <role.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1">{role.label}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{role.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-8 mt-12 text-center"
        >
          {[
            { value: "5,000+", label: "Students" },
            { value: "2,000+", label: "Daily Orders" },
            { value: "< 10 min", label: "Avg Wait" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground border-t border-border">
        CCMS v1.0 · March 2026
      </footer>
    </div>
  );
}
