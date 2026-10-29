// The mark: detection brackets around a single A-into-W line. Colours come from the design tokens, so it
// follows the theme; the entrance animation (see .logo in site.css) plays once per page load.
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg className={`logo ${className}`.trim()} viewBox="0 0 64 64" aria-hidden="true">
      <path className="logo-br" pathLength={1} d="M6 22V6h16M42 6h16v16M58 42v16H42M22 58H6V42" />
      <path className="logo-line" pathLength={1} d="M13 45 23.2 19 33.5 45 39.3 28.1 45.1 45 51 19" />
      <path className="logo-bar" d="M18 36h10.4" />
    </svg>
  )
}
