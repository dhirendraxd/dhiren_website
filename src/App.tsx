import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Affiliations from "./pages/Affiliations";
import AffiliationDetail from "./pages/AffiliationDetail";
import Hackathon from "./pages/Hackathon";
import HackathonDetail from "./pages/HackathonDetail";
import Contact from "./pages/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/affiliations" element={<Affiliations />} />
          <Route path="/affiliations/:id" element={<AffiliationDetail />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/hackathon/:id" element={<HackathonDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
