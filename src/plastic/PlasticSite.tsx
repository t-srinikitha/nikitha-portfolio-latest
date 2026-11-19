import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PlasticLayout } from "./PlasticLayout";
import { PAGES } from "./data";
import Overview from "./pages/Overview";
import Business from "./pages/Business";
import Technology from "./pages/Technology";

function useTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = PAGES.find((p) => p.path === pathname.replace(/\/$/, ""));
    document.title = page && page.label !== "Overview" ? `${page.label} · PlasticOptics` : "PlasticOptics";
  }, [pathname]);
}

export default function PlasticSite() {
  useTitle();
  return (
    <PlasticLayout>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="technology" element={<Technology />} />
        <Route path="business" element={<Business />} />
        {/* Old addresses */}
        <Route path="science" element={<Navigate to="/plastic/technology" replace />} />
        <Route path="roadmap" element={<Navigate to="/plastic/technology#roadmap" replace />} />
        <Route path="market" element={<Navigate to="/plastic/business" replace />} />
        <Route path="numbers" element={<Navigate to="/plastic/business#model" replace />} />
        <Route path="*" element={<Navigate to="/plastic" replace />} />
      </Routes>
    </PlasticLayout>
  );
}
