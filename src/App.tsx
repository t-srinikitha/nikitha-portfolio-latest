import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Layout } from "./components/layout/layout";
import  MinimalPortfolio from "./pages/MinimalPortfolio";
import  ProjectsPage  from "./pages/ProjectsPage";
import ClimatePage from "./pages/ClimatePage";
import WorkWithMe from "./pages/WorkWithMe";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<MinimalPortfolio />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/climate" element={<ClimatePage />} />
            <Route path="/work-with-me" element={<WorkWithMe />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
