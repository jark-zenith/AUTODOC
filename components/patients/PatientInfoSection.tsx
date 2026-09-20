type PatientInfoSectionProps = {
  title: string;
  items: string[];
  emptyLabel?: string;
};

export function PatientInfoSection({ title, items, emptyLabel = "No entries recorded" }: PatientInfoSectionProps) {
  return (
    <section className="patient-info-section">
      <h3>{title}</h3>
      {items.length > 0 ? <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="patient-empty">{emptyLabel}</p>}
    </section>
  );
}
