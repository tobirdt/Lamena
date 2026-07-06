import { Link } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link to="/" className="footer-brand">
          <BrandLogo />
        </Link>
        <div className="footer-links">
          <Link to="/#home">Home</Link>
          <Link to="/privacy">Privacy &amp; Legal</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
      <div className="footer-meta">
        <span>Lamena FZE · Jebel Ali Free Zone · Dubai, UAE</span>
        <span>© 2026</span>
      </div>
    </footer>
  )
}
