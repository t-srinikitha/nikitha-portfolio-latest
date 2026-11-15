import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { EMAIL, PAGES } from "./data";
import "./plastic.css";

const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap";

function useFonts() {
  useEffect(() => {
    if (document.querySelector(`link[data-po-fonts]`)) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = FONTS_HREF;
    l.setAttribute("data-po-fonts", "");
    document.head.appendChild(l);
  }, []);
}

function Wordmark({ small }: { small?: boolean }) {
  return (
    <Link to="/plastic" className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className={small ? "h-5 w-5" : "h-6 w-6"} aria-hidden>
        <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="9" cy="10" r="2.2" fill="var(--po-accent)" />
        <circle cx="15.5" cy="14.5" r="1.4" fill="var(--po-accent)" />
        <circle cx="14" cy="7.5" r="0.9" fill="currentColor" />
        <circle cx="8" cy="16" r="0.9" fill="currentColor" />
      </svg>
      <span className={`serif ${small ? "text-[19px]" : "text-[22px]"} leading-none`}>PlasticOptics</span>
    </Link>
  );
}

function PageList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="grid gap-0.5">
      {PAGES.map((p) => (
        <li key={p.path}>
          <NavLink
            to={p.path}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `block py-1.5 text-[15px] transition-colors ${isActive ? "text-[var(--po-ink)] font-medium" : "muted hover:text-[var(--po-ink)]"}`
            }
          >
            {p.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

/** Sections of the current page, read from [data-toc], with the section in view highlighted. */
function SectionList() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setItems(Array.from(document.querySelectorAll<HTMLElement>("[data-toc]")).map((el) => ({ id: el.id, label: el.dataset.toc || el.id })));
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!items.length) return;
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (!items.length) return null;
  return (
    <nav aria-label="Sections on this page" className="mt-6 pt-6 border-t hair">
      <ul className="grid gap-0.5 border-l hair">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`-ml-px block border-l py-1 pl-3 text-[13.5px] leading-snug transition-colors ${
                  on ? "border-[var(--po-ink)] text-[var(--po-ink)]" : "border-transparent muted hover:text-[var(--po-ink)]"
                }`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NextPage() {
  const { pathname } = useLocation();
  const idx = PAGES.findIndex((p) => p.path === pathname.replace(/\/$/, ""));
  const next = idx >= 0 && idx < PAGES.length - 1 ? PAGES[idx + 1] : null;
  if (!next) return null;
  return (
    <Link
      to={next.path}
      className="group border-t hair -mx-6 md:-mx-12 px-6 md:px-12 py-10 flex items-center justify-between no-print"
    >
      <span className="serif text-[24px]">{next.label}</span>
      <ArrowRight className="h-5 w-5 muted group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

export function PlasticLayout({ children }: { children: React.ReactNode }) {
  useFonts();
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname, hash]);

  return (
    <div className="po min-h-screen">
      {/* Mobile / tablet top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-[var(--po-bg)]/95 backdrop-blur border-b hair no-print">
        <div className="flex items-center justify-between px-5 h-14">
          <Wordmark small />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="po-menu"
            className="inline-flex items-center gap-2 text-[13.5px] px-3 py-1.5 border hair rounded"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            {PAGES.find((p) => p.path === pathname.replace(/\/$/, ""))?.label ?? "Menu"}
          </button>
        </div>
        {open && (
          <div id="po-menu" className="px-5 pb-5 pt-3 border-t hair">
            <PageList onNavigate={() => setOpen(false)} />
          </div>
        )}
      </div>

      <div className="mx-auto max-w-[1180px] lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Left column: pages, then sections of the current page */}
        <aside className="hidden lg:block no-print">
          <div className="sticky top-0 max-h-screen overflow-y-auto py-10 pl-8 pr-6">
            <Wordmark />
            <div className="mt-10">
              <PageList />
            </div>
            <SectionList />
          </div>
        </aside>

        <main className="min-w-0 lg:border-l hair">
          <div className="px-6 md:px-12 max-w-[800px]">
            {children}
            <NextPage />
          </div>
          <footer className="border-t hair px-6 md:px-12 py-10 text-[13px] muted flex flex-wrap gap-x-6 gap-y-2 justify-between max-w-[800px]">
            <span>PlasticOptics · Sri Nikitha T</span>
            <a href={`mailto:${EMAIL}?subject=PlasticOptics`} className="ulink">
              {EMAIL}
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
