// PROTECTED ASSET: Shinn Digital Brand Chevrons
// Lowercase filename: brand-logo.jsx
export const BrandLogo = ({
  className,
  title = "Shinn Digital | Veteran-Owned Web Creation",
}) => (
  <svg
    viewBox="0 0 500 500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-hidden="true"
  >
    <title>{title}</title>
    <path
      d="M100 150L250 300L100 450"
      stroke="#2563EB"
      strokeWidth="80"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M280 150L430 300L280 450"
      stroke="#94a3b8"
      strokeWidth="80"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
