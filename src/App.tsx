import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import  MinimalPortfolio from "./pages/MinimalPortfolio";
import  ProjectsPage  from "./pages/ProjectsPage";
import ClimatePage from "./pages/ClimatePage";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MinimalPortfolio />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/climate" element={<ClimatePage />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
