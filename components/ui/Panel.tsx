type PanelProps = {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function Panel({ eyebrow, title, children, className = "" }: PanelProps) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-heading">
        <div>
          {eyebrow ? <p className="panel-eyebrow">{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        <span className="panel-corner" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}
