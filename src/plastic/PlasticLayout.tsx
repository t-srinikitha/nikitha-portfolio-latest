import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { EMAIL, KEY_NUMBERS, PAGES } from "./data";
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

function Status() {
  return (
    <span className="inline-flex items-center gap-2 text-[12.5px]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--po-accent)] opacity-60 animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--po-accent)]" />
      </span>
      Funding request: ₹23.8 L
    </span>
  );
}

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <ul className="grid gap-0.5">
      {PAGES.map((p) => (
        <li key={p.path}>
          <NavLink
            to={p.path}
            end
            onClick={onNavigate}
            className={({ isActive }) =>
              `block py-1 text-[14.5px] transition-colors ${isActive ? "text-[var(--po-ink)] font-medium" : "muted hover:text-[var(--po-ink)]"}`
            }
          >
            {({ isActive }) => (
              <span className="inline-flex items-center gap-2">
                <span className={`h-1 w-1 rounded-full ${isActive ? "bg-[var(--po-accent)]" : "bg-transparent"}`} />
                {p.label}
              </span>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function KeyNumbers({ inline }: { inline?: boolean }) {
  return (
    <div className={inline ? "border hair bg-[var(--po-paper)]" : ""}>
      <div className={`mono text-[11px] uppercase tracking-[0.06em] muted ${inline ? "px-4 pt-4" : ""}`}>Key numbers</div>
      <dl className={`mt-3 ${inline ? "grid grid-cols-2 sm:grid-cols-3 gap-px bg-[var(--po-line)] border-t hair" : "grid gap-0"}`}>
        {KEY_NUMBERS.map((n) => (
          <div key={n.k} className={inline ? "bg-[var(--po-paper)] px-4 py-3" : "py-2.5 border-b hair"}>
            <dt className="text-[12px] muted">{n.k}</dt>
            <dd className={`num mt-0.5 ${inline ? "text-[13.5px] sm:text-[15px] whitespace-nowrap" : "text-[15px]"}`}>{n.v}</dd>
            {n.note && <dd className="text-[11.5px] muted leading-snug">{n.note}</dd>}
          </div>
        ))}
      </dl>
    </div>
  );
}

function OnThisPage() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<{ id: string; label: string }[]>([]);
  useEffect(() => {
    const t = setTimeout(() => {
      setItems(
        Array.from(document.querySelectorAll<HTMLElement>("[data-toc]")).map((el) => ({ id: el.id, label: el.dataset.toc || el.id })),
      );
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);
  if (!items.length) return null;
  return (
    <nav aria-label="On this page" className="mt-8">
      <div className="mono text-[11px] uppercase tracking-[0.06em] muted">On this page</div>
      <ul className="mt-3 grid gap-1">
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="text-[13px] muted hover:text-[var(--po-ink)] transition-colors">
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
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
            {PAGES.find((p) => p.path === pathname)?.label ?? "Menu"}
          </button>
        </div>
        {open && (
          <div id="po-menu" className="px-5 pb-5 border-t hair">
            <div className="pt-4">
              <NavItems onNavigate={() => setOpen(false)} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={`mailto:${EMAIL}?subject=PlasticOptics`} className="btn">
                Contact
              </a>
              <Status />
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-[1380px] lg:grid lg:grid-cols-[228px_minmax(0,1fr)] xl:grid-cols-[228px_minmax(0,1fr)_264px]">
        {/* Left sidebar */}
        <aside className="hidden lg:block no-print">
          <div className="sticky top-0 h-screen flex flex-col justify-between py-10 pl-8 pr-6">
            <div>
              <Wordmark />
              <p className="mt-3 text-[12.5px] muted leading-snug max-w-[18ch]">Microplastic detection for drinking water</p>
              <div className="mt-10">
                <NavItems />
              </div>
            </div>
            <div className="grid gap-4">
              <Status />
              <a href={`mailto:${EMAIL}?subject=PlasticOptics`} className="btn w-fit">
                Contact
              </a>
              <a href="/" className="text-[12.5px] muted hover:text-[var(--po-ink)] inline-flex items-center gap-1">
                srinikitha.com <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* Centre column */}
        <main className="min-w-0 lg:border-x hair">
          <div className="px-6 md:px-12 max-w-[820px]">{children}</div>
          <footer className="border-t hair px-6 md:px-12 py-10 text-[13px] muted flex flex-wrap gap-x-6 gap-y-2 justify-between">
            <span>PlasticOptics · Sri Nikitha T</span>
            <a href={`mailto:${EMAIL}?subject=PlasticOptics`} className="ulink">
              {EMAIL}
            </a>
          </footer>
        </main>

        {/* Right rail */}
        <aside className="hidden xl:block no-print">
          <div className="sticky top-0 max-h-screen overflow-y-auto py-10 px-6">
            <KeyNumbers />
            <OnThisPage />
          </div>
        </aside>
      </div>
    </div>
  );
}
