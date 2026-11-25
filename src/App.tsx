import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/layout/layout";
import  MinimalPortfolio from "./pages/MinimalPortfolio";
import  ProjectsPage  from "./pages/ProjectsPage";
import ClimatePage from "./pages/ClimatePage";
import { Toaster } from "./components/ui/sonner";

// PlasticOptics shares the site theme and header, with its own page navigation.
const PlasticSite = lazy(() => import("./plastic/PlasticSite"));

// The microsite used to live at /plastic.
function OldPlasticRedirect() {
  const { pathname, search, hash } = useLocation();
  return <Navigate to={pathname.replace(/^\/plastic/, "/plasticoptics") + search + hash} replace />;
}

function Portfolio() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MinimalPortfolio />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/climate" element={<ClimatePage />} />
        <Route path="/work-with-me" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <Routes>
          <Route
            path="/plasticoptics/*"
            element={
              <Layout>
                <Suspense fallback={<div className="min-h-screen" />}>
                  <PlasticSite />
                </Suspense>
              </Layout>
            }
          />
          <Route path="/plastic/*" element={<OldPlasticRedirect />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
