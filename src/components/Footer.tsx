import { Link } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'

export function Footer() {
  return (
    <footer className="site-footer">
      <Link to="/" className="footer-brand">
        <BrandLogo />
      </Link>
      <div className="footer-links">
        <Link to="/privacy">Privacy & Legal</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/#home">Home</Link>
      </div>
      <span>Lamena © 2026</span>
    </footer>
  )
}
