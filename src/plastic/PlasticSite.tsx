import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PlasticLayout } from "./PlasticLayout";
import { PAGES } from "./data";
import Overview from "./pages/Overview";
import Numbers from "./pages/Numbers";
import Market from "./pages/Market";
import Roadmap from "./pages/Roadmap";
import Science from "./pages/Science";

function useTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = PAGES.find((p) => p.path === pathname.replace(/\/$/, ""));
    document.title = page && page.label !== "Overview" ? `${page.label} · PlasticOptics` : "PlasticOptics · Microplastics counted at the plant";
  }, [pathname]);
}

export default function PlasticSite() {
  useTitle();
  return (
    <PlasticLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="numbers" element={<Numbers />} />
        <Route path="market" element={<Market />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="science" element={<Science />} />
        <Route path="*" element={<Navigate to="/plastic" replace />} />
      </Routes>
    </PlasticLayout>
  );
}
