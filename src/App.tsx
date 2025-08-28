import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import HomePage from "./pages/HomePage";
import ShipsPage from "./pages/ShipsPage";
import NowPage from "./pages/NowPage";
import ProjectPage from "./pages/ProjectPage";
import Custom404 from "./pages/Custom404";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ships" element={<ShipsPage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/project/:slug" element={<ProjectPage />} />
            <Route path="/writing" element={<Custom404 />} />
            <Route path="*" element={<Custom404 />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
