import Link from 'next/link';

/**
 * MainFooter Component
 * Footer with logo, copyright, and links
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
            © {currentYear} Queue Management System. All rights reserved.
          </span>
        </div>

        {/* Links */}
        <nav className="main-footer-nav">
          <Link href="/privacy" className="main-footer-link">
            นโยบายความเป็นส่วนตัว
          </Link>
          <Link href="/terms" className="main-footer-link">
            ข้อกำหนดการใช้งาน
          </Link>
          <Link href="/contact" className="main-footer-link">
            ติดต่อเรา
          </Link>
        </nav>
      </div>
    </footer>
  );
}
