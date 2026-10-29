export default function PageHead({ eyebrow, children, lead }: { eyebrow: string; children: React.ReactNode; lead?: string }) {
  return (
    <div className="wrap page-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{children}</h1>
      {lead && <p className="lead">{lead}</p>}
    </div>
  )
}
