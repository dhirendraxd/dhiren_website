import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion, type Transition } from "framer-motion";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServiceShowcase = lazy(() => import("./pages/ServiceShowcase"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Projects = lazy(() => import("./pages/SelectedProjects"));

const queryClient = new QueryClient();

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};

const pageTransition: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
};

const RouteFallback = () => <div className="min-h-screen bg-background" aria-hidden="true" />;

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Suspense fallback={<RouteFallback />}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main-content"
          role="main"
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/digital-marketing" element={<ServiceShowcase forcedSlug="digital-marketing" />} />
            <Route path="/advocacy-community" element={<ServiceShowcase forcedSlug="advocacy-community" />} />
            <Route path="/tech-projects" element={<ServiceShowcase forcedSlug="tech-projects" />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
