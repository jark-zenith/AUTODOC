const navigationItems = [
  ["Dashboard", "⌂", "/"],
  ["Patients", "⊙", "/patients"],
  ["Symptoms", "⌁", "/symptoms"],
  ["Simulation", "◌", "/simulation"],
  ["Tasks", "◇", "/tasks"],
  ["Research", "⌁", "/research"],
  ["Medical Knowledge", "▤", "/knowledge"],
  ["Reasoning", "⌁", "/reasoning"],
  ["Safety", "◇", "/safety"],
  ["Assessment", "◎", "/assessment"],
  ["Family", "⌂", "/family"],
  ["Notifications", "◇", "/notifications"],
  ["Identity", "◎", "/identity"],
  ["Admin", "◆", "/admin"],
  ["System", "▦", "/system"],
  ["Settings", "⚙", "/settings"]
] as const;

type NavigationProps = { activeHref: string };

export function Navigation({ activeHref }: NavigationProps) {
  return (
    <nav className="navigation" aria-label="Primary navigation">
      <p className="navigation-label">Core systems</p>
      <div className="navigation-list">
        {navigationItems.map(([label, icon, href]) => (
          <a className={`navigation-item ${href === activeHref ? "is-active" : ""}`} href={href} key={label}>
            <span className="navigation-icon" aria-hidden="true">{icon}</span>
            <span>{label}</span>
            {href === activeHref ? <span className="navigation-active-mark" aria-hidden="true" /> : null}
          </a>
        ))}
      </div>
      <div className="navigation-footnote">
        <span className="status-orb" aria-hidden="true" />
        <div><strong>Simulation mode</strong><small>Real-world actions disabled</small></div>
      </div>
    </nav>
  );
}
