import { site } from '@/lib/site'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <span>© 2026 Alex Waweru · Senior AI Engineer</span>
        <span><a href={`mailto:${site.email}`}>{site.email}</a> · {site.location}</span>
      </div>
    </footer>
  )
}
