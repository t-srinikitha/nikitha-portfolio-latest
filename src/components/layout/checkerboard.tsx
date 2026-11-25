/** Classic Mac diamond checkerboard, as a background for its parent. */
export function Checkerboard() {
  return (
    <div
      aria-hidden
      className="print:hidden absolute inset-0 pointer-events-none opacity-[0.15] dark:opacity-[0.1]"
      style={{
        backgroundImage: `
          linear-gradient(45deg, #F5A623 25%, transparent 25%),
          linear-gradient(-45deg, #F5A623 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, #F5A623 75%),
          linear-gradient(-45deg, transparent 75%, #F5A623 75%)
        `,
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
      }}
    />
  );
}
