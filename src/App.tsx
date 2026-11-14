import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/layout/layout";
import  MinimalPortfolio from "./pages/MinimalPortfolio";
import  ProjectsPage  from "./pages/ProjectsPage";
import ClimatePage from "./pages/ClimatePage";
import WorkWithMe from "./pages/WorkWithMe";
import { Toaster } from "./components/ui/sonner";

// PlasticOptics is a standalone microsite with its own theme and navigation.
const PlasticSite = lazy(() => import("./plastic/PlasticSite"));

function Portfolio() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MinimalPortfolio />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/climate" element={<ClimatePage />} />
        <Route path="/work-with-me" element={<WorkWithMe />} />
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
            path="/plastic/*"
            element={
              <Suspense fallback={<div className="min-h-screen" style={{ background: "#f5f4ef" }} />}>
                <PlasticSite />
              </Suspense>
            }
          />
          <Route path="*" element={<Portfolio />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
