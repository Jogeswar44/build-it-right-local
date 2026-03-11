import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import KitchenLoginPage from "./pages/KitchenLoginPage";
import KitchenRegisterPage from "./pages/KitchenRegisterPage";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import PaymentPage from "./pages/PaymentPage";
import TrackOrderPage from "./pages/TrackOrderPage";
import KitchenDashboard from "./pages/KitchenDashboard";
import TokenDisplay from "./pages/TokenDisplay";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/kitchen/login" element={<KitchenLoginPage />} />
          <Route path="/kitchen/register" element={<KitchenRegisterPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/kitchen" element={<KitchenDashboard />} />
          <Route path="/display" element={<TokenDisplay />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
