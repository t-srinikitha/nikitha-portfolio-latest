import { PNL_ROWS, type Row } from "./model";

export function PnlTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0">
      <table className="po-table" style={{ minWidth: 200 + rows.length * 76 }}>
        <thead>
          <tr>
            <th>₹ lakh</th>
            {rows.map((r) => (
              <th key={r.year} className="r">
                Year {r.year}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PNL_ROWS.map((def) => {
            const sub = def.style === "sub";
            const strong = def.style === "total" || def.style === "key";
            return (
              <tr key={`${def.key}-${def.label}`} className={strong ? "em" : ""}>
                <td className={`whitespace-nowrap ${sub ? "!pl-6 muted" : ""} ${def.style === "head" ? "muted" : ""}`}>{def.label}</td>
                {rows.map((r) => {
                  const v = r[def.key] as number;
                  const text = def.kind === "count" ? String(v) : def.kind === "pct" ? (v ? `${v}%` : "–") : v.toFixed(1);
                  const lime = def.style === "key" && v > 0;
                  return (
                    <td
                      key={r.year}
                      className={`r ${sub ? "muted" : ""} ${lime ? "bg-[var(--po-lime)]" : ""} ${def.kind === "money" && v < 0 && !sub ? "text-[var(--po-accent)]" : ""}`}
                    >
                      {text}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
