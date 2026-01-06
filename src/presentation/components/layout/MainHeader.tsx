'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '../common/ThemeToggle';

/**
 * MainHeader Component
 * Header with logo, navigation, and theme toggle
 */
export function MainHeader() {
  const pathname = usePathname();

  // Helper to check active link
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="main-header">
      <div className="main-header-container">
        {/* Logo */}
        <Link href="/" className="main-logo">
          <span className="main-logo-icon">📋</span>
          <span className="main-logo-text">Queue Quote</span>
        </Link>

        {/* Navigation */}
        <nav className="main-nav">
          <Link
            href="/"
            className={`main-nav-link ${isActive('/') ? 'main-nav-link-active' : ''}`}
          >
            <span className="main-nav-icon">🏠</span>
            <span>หน้าแรก</span>
          </Link>
          <Link
            href="/builder"
            className={`main-nav-link ${isActive('/builder') ? 'main-nav-link-active' : ''}`}
          >
            <span className="main-nav-icon">🛠️</span>
            <span>สร้างใบเสนอราคา</span>
          </Link>
          <Link
            href="/about"
            className={`main-nav-link ${isActive('/about') ? 'main-nav-link-active' : ''}`}
          >
            <span className="main-nav-icon">ℹ️</span>
            <span>เกี่ยวกับเรา</span>
          </Link>
        </nav>

        {/* Actions */}
        <div className="main-header-actions">
          <ThemeToggle />
          <Link href="/builder" className="main-button-primary">
            เริ่มต้นใช้งาน
          </Link>
        </div>
      </div>
    </header>
  );
}
