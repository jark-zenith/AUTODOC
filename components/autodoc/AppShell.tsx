import { Dashboard } from "../dashboard/Dashboard";
import { Navigation } from "./Navigation";

type AppShellProps = {
  children?: React.ReactNode;
  activeHref?: string;
};

export function AppShell({ children, activeHref = "/" }: AppShellProps) {
  return (
    <main className="autodoc-app">
      <header className="app-header">
        <a className="brand" href="/" aria-label="AUTODOC dashboard">
          <span className="brand-mark">A</span>
          <span><strong>AUTODOC</strong><small>Autonomous Medical Intelligence System</small></span>
        </a>
        <div className="header-status"><span className="header-status-dot" /> SYSTEM ONLINE / SIMULATION</div>
        <div className="operator-profile"><span className="operator-avatar">OP</span><span><small>Operator</small><strong>Local session</strong></span><span className="profile-chevron">⌄</span></div>
      </header>
      <div className="app-body">
        <aside className="app-sidebar"><Navigation activeHref={activeHref} /></aside>
        <section className="app-main">{children ?? <Dashboard />}</section>
      </div>
      <footer className="app-footer"><span><span className="footer-pulse" />AUTODOC software simulation / no clinical operation enabled</span><span>BUILD 0.1.0</span></footer>
    </main>
  );
}
