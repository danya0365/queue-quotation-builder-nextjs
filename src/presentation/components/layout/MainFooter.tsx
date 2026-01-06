import Link from 'next/link';

/**
 * MainFooter Component
 * Mobile-friendly footer with stacked layout
 */
export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer-container">
        {/* Brand */}
        <div className="main-footer-brand">
          <span className="main-footer-logo">📋 Queue Quote</span>
          <span className="main-footer-copyright">
            © {currentYear} Queue Management System
          </span>
        </div>

        {/* Links */}
        <nav className="main-footer-nav">
          <Link href="/privacy" className="main-footer-link">
            นโยบาย
          </Link>
          <Link href="/terms" className="main-footer-link">
            ข้อกำหนด
          </Link>
          <Link href="/contact" className="main-footer-link">
            ติดต่อ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
