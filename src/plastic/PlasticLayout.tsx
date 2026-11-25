import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { EMAIL, PAGES } from "./data";
import "./plastic.css";

function Wordmark({ small }: { small?: boolean }) {
  return (
    <Link to="/plasticoptics" className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 24 24" className={small ? "h-5 w-5" : "h-6 w-6"} aria-hidden>
        <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="9" cy="10" r="2.2" fill="var(--po-accent)" />
        <circle cx="15.5" cy="14.5" r="1.4" fill="var(--po-accent)" />
        <circle cx="14" cy="7.5" r="0.9" fill="currentColor" />
        <circle cx="8" cy="16" r="0.9" fill="currentColor" />
      </svg>
      <span className={`serif ${small ? "text-[15px]" : "text-[17px]"} leading-none`}>PlasticOptics</span>
    </Link>
  );
}

function PageTabs() {
  return (
    <nav aria-label="PlasticOptics pages" className="no-print sticky top-14 z-40 bg-[var(--po-bg)] border-b hair">
      <div className="mx-auto max-w-[1060px] px-6 md:px-12 h-12 flex items-center gap-8">
        <div className="hidden sm:block">
          <Wordmark small />
        </div>
        <ul className="flex h-full gap-6">
          {PAGES.map((p) => (
            <li key={p.path} className="h-full">
              <NavLink
                to={p.path}
                end
                className={({ isActive }) =>
                  `mono h-full flex items-center border-b-2 text-[13px] transition-colors ${
                    isActive ? "border-[var(--po-ink)] font-medium" : "border-transparent muted hover:text-[var(--po-ink)]"
                  }`
                }
              >
                {p.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

type TocItem = { id: string; label: string; level: number; parent: string | null };

/** Contents of the current page, read from [data-toc], with the section in view highlighted. */
function Contents() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<TocItem[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const t = setTimeout(() => {
      let parent: string | null = null;
      setItems(
        Array.from(document.querySelectorAll<HTMLElement>("[data-toc]")).map((el) => {
          const level = Number(el.dataset.tocLevel || 1);
          if (level === 1) parent = el.id;
          return { id: el.id, label: el.dataset.toc || el.id, level, parent: level === 1 ? null : parent };
        }),
      );
    }, 0);
    setToggled({});
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
    const t = setTimeout(onScroll, 150);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  if (!items.length) return null;
  const activeGroup = items.find((i) => i.id === active)?.parent ?? active;
  const groups = items
    .filter((i) => i.level === 1)
    .map((g) => ({ ...g, subs: items.filter((i) => i.parent === g.id) }));

  return (
    <nav aria-label="Contents of this page">
      <div className="mono text-[11px] uppercase tracking-wide muted mb-5">Contents</div>
      <ul className="grid gap-1">
        {groups.map((g) => {
          const isActive = g.id === activeGroup;
          const isOpen = toggled[g.id] ?? isActive;
          return (
            <li key={g.id}>
              <div className="flex items-start justify-between gap-2">
                <a
                  href={`#${g.id}`}
                  className={`flex-1 py-2 text-[14px] leading-snug transition-colors ${
                    isActive ? "text-[var(--po-ink)] font-medium" : "ink2 hover:text-[var(--po-ink)]"
                  }`}
                >
                  {g.label}
                </a>
                {g.subs.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? "Hide" : "Show"} subsections of ${g.label}`}
                    onClick={() => setToggled((t) => ({ ...t, [g.id]: !isOpen }))}
                    className="mt-1.5 p-1 -mr-1 muted hover:text-[var(--po-ink)]"
                  >
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
              {g.subs.length > 0 && (
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <ul className="min-h-0 overflow-hidden">
                    <li className="h-1" aria-hidden />
                    {g.subs.map((it) => {
                      const on = it.id === active;
                      return (
                        <li key={it.id}>
                          <a
                            href={`#${it.id}`}
                            tabIndex={isOpen ? 0 : -1}
                            className={`block border-l py-1.5 pl-3.5 text-[13px] leading-snug transition-colors ${
                              on
                                ? "border-[var(--po-ink)] text-[var(--po-ink)]"
                                : "border-[var(--po-line)] muted hover:text-[var(--po-ink)]"
                            }`}
                          >
                            {it.label}
                          </a>
                        </li>
                      );
                    })}
                    <li className="h-2" aria-hidden />
                  </ul>
                </div>
              )}
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
      <span className="serif text-[19px]">{next.label}</span>
      <ArrowRight className="h-5 w-5 muted group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}

export function PlasticLayout({ children }: { children: React.ReactNode }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    else setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50);
  }, [pathname, hash]);

  return (
    <div className="po min-h-screen">
      <PageTabs />
      <div className="mx-auto max-w-[1060px] lg:grid lg:grid-cols-[minmax(0,1fr)_240px]">
        <main className="min-w-0 lg:border-r hair">
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
        {/* Right column: contents of the current page */}
        <aside className="hidden lg:block no-print">
          <div className="sticky top-[104px] max-h-[calc(100vh-104px)] overflow-y-auto py-10 pl-7 pr-7">
            <Contents />
          </div>
        </aside>
      </div>
    </div>
  );
}
