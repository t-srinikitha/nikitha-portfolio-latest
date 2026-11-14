import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SOURCES } from "./data";

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
export const lakh = (n: number, d = 1) => `₹${n.toFixed(d)} L`;

export function PageHead({ kicker, title, lede }: { kicker: string; title: React.ReactNode; lede?: React.ReactNode }) {
  return (
    <header className="pt-10 md:pt-16 pb-10 md:pb-12">
      <span className="chip">{kicker}</span>
      <h1 className="serif mt-5 text-[34px] leading-[1.08] md:text-[46px] md:leading-[1.05] max-w-[20ch]">{title}</h1>
      {lede && <div className="mt-5 text-[16px] md:text-[17px] leading-relaxed ink2 max-w-[60ch]">{lede}</div>}
    </header>
  );
}

/** A ruled section of the centre column, sfcompute-style. */
export function Block({
  id,
  tag,
  title,
  intro,
  children,
}: {
  id: string;
  tag: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} data-toc={tag} className="border-t hair -mx-6 md:-mx-12 px-6 md:px-12 py-12 md:py-14 scroll-mt-16 lg:scroll-mt-4">
      <span className="chip">{tag}</span>
      {title && <h2 className="serif mt-4 text-[26px] md:text-[30px] leading-[1.15] max-w-[28ch]">{title}</h2>}
      {intro && <div className="mt-3 ink2 max-w-[62ch]">{intro}</div>}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

export function Stat({ v, k, accent }: { v: React.ReactNode; k: React.ReactNode; accent?: boolean }) {
  return (
    <div className="py-4 px-4 bg-[var(--po-paper)] border hair">
      <div className={`num text-[20px] md:text-[22px] leading-tight ${accent ? "text-[var(--po-accent)]" : ""}`}>{v}</div>
      <div className="mt-1.5 text-[12.5px] leading-snug muted">{k}</div>
    </div>
  );
}

export function Src({ id }: { id: keyof typeof SOURCES }) {
  const s = SOURCES[id];
  return (
    <a href={s.url} target="_blank" rel="noopener noreferrer" className="mono text-[11px] muted ulink inline-flex items-center gap-0.5" title={s.label}>
      source <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

export function NextLinks({ items }: { items: { to: string; title: string; body: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-px bg-[var(--po-line)] border hair">
      {items.map((it) => (
        <Link key={it.to} to={it.to} className="group bg-[var(--po-paper)] p-5 hover:bg-white transition-colors">
          <div className="flex items-center justify-between">
            <span className="serif text-[20px]">{it.title}</span>
            <ArrowRight className="h-4 w-4 muted group-hover:translate-x-0.5 transition-transform" />
          </div>
          <p className="mt-1.5 text-[13.5px] muted leading-snug">{it.body}</p>
        </Link>
      ))}
    </div>
  );
}

export function Callout({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "accent" }) {
  return (
    <div
      className={`border-l-2 pl-4 py-1 text-[15.5px] leading-relaxed ${
        tone === "accent" ? "border-[var(--po-accent)]" : "border-[var(--po-ink)]"
      }`}
    >
      {children}
    </div>
  );
}

/* Range-chart primitives */
export const LABEL_COLS = "grid grid-cols-[1fr_76px] sm:grid-cols-[200px_1fr_88px] gap-x-3 gap-y-1 items-center";

export function Axis({ labels }: { labels: [number, string][] }) {
  return (
    <div aria-hidden className={`${LABEL_COLS} mb-2`}>
      <span className="hidden sm:block" />
      <div className="relative h-4 num text-[10.5px] muted">
        {labels.map(([pos, l], i) => (
          <span
            key={l}
            className={`absolute whitespace-nowrap ${i % 2 === 1 && i !== labels.length - 1 ? "hidden sm:inline" : ""}`}
            style={{ left: `${pos}%`, transform: i === 0 ? "none" : i === labels.length - 1 ? "translateX(-100%)" : "translateX(-50%)" }}
          >
            {l}
          </span>
        ))}
      </div>
      <span />
    </div>
  );
}

export function Gridlines({ ticks }: { ticks: number[] }) {
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none">
      {ticks.map((t) => (
        <i key={t} className="absolute top-0 bottom-0 w-px bg-[var(--po-line)]" style={{ left: `${Math.min(t, 99.8)}%` }} />
      ))}
    </div>
  );
}

export function RangeRow({
  label,
  sub,
  value,
  valueClass = "",
  bold,
  children,
}: {
  label: React.ReactNode;
  sub?: string;
  value: React.ReactNode;
  valueClass?: string;
  bold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={LABEL_COLS}>
      <div className={`col-span-2 sm:col-span-1 text-[12.5px] sm:text-[13px] leading-snug ${bold ? "font-semibold" : ""}`}>
        {sub && <span className="block mono text-[10px] muted">{sub}</span>}
        {label}
      </div>
      <div className="relative h-5">{children}</div>
      <div className={`num text-[11.5px] sm:text-[12.5px] text-right ${bold ? "font-semibold" : ""} ${valueClass}`}>{value}</div>
    </div>
  );
}

export function Figure({ title, note, children }: { title: string; note?: React.ReactNode; children: React.ReactNode }) {
  return (
    <figure className="border hair bg-[var(--po-paper)] p-4 md:p-6">
      <figcaption className="mb-5">
        <div className="font-medium text-[14.5px]">{title}</div>
        {note && <div className="mt-0.5 text-[13px] muted">{note}</div>}
      </figcaption>
      {children}
    </figure>
  );
}
