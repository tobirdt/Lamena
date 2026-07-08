import { Link } from 'react-router-dom'
import { BrandLogo } from './BrandLogo'
import { Reveal } from './Reveal'

/** Dark closing band — bookends the hero and the portfolio chapter. */
export function Footer() {
  return (
    <footer className="site-footer">
      <Reveal className="footer-inner">
        <p className="footer-signoff">
          Security. Safety. <span>Communication.</span>
        </p>
        <div className="footer-main">
          <Link to="/" className="footer-brand" aria-label="Lamena home">
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
      </Reveal>
    </footer>
  )
}
