import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Inquiries from "./pages/Inquiries";
import LoginPortal from "./pages/LoginPortal";
import StaffLogin from "./pages/StaffLogin";
import ClientsPage from "./pages/ClientsPage";
import Index from "./pages/Index";
import EditProfile from "./pages/EditProfile";
import LoanApproval from "./pages/LoanApproval";
import LoanDeductions from "./pages/LoanDeductions";
import VerifyEmployee from "./pages/VerifyEmployee";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="stallion-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/inquiries" element={<Inquiries />} />
            <Route path="/login" element={<LoginPortal />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/client-login" element={<LoginPortal />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/profile" element={<Index />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/loan-approval" element={<LoanApproval />} />
            <Route path="/loan-deductions" element={<LoanDeductions />} />
            <Route path="/verify" element={<VerifyEmployee />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
