type WizLogoProps = {
  theme?: "dark" | "light";
  showName?: boolean;
  compact?: boolean;
};

function WizLogo({
  theme = "dark",
  showName = true,
  compact = false,
}: WizLogoProps) {
  const className = [
    "wiz-logo",
    `wiz-logo--${theme}`,
    compact ? "wiz-logo--compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className} aria-label="株式会社WIZ">
      <svg
        className="wiz-logo-mark"
        viewBox="0 0 96 64"
        role="img"
        aria-hidden="true"
      >
        <rect
          x="13"
          y="8"
          width="21"
          height="46"
          rx="10.5"
          transform="rotate(-27 23.5 31)"
          fill="#4b238f"
        />
        <rect
          x="43"
          y="8"
          width="21"
          height="46"
          rx="10.5"
          transform="rotate(-27 53.5 31)"
          fill="#294ba8"
        />
        <circle cx="82" cy="14" r="9" fill="#1559b7" />
      </svg>
      {showName && <span className="wiz-logo-name">株式会社WIZ</span>}
    </div>
  );
}

export default WizLogo;
