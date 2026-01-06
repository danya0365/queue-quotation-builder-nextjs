'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ThemeToggle } from '../common/ThemeToggle';

/**
 * MainHeader Component
 * Mobile-friendly header with hamburger menu
 */
export function MainHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation */}
        <nav className="main-nav hidden lg:flex">
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
          <Link href="/builder" className="main-button-primary hidden lg:flex">
            เริ่มต้นใช้งาน
          </Link>
          {/* Mobile Menu Button - hidden on lg and up */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden main-icon-button"
            aria-label="Menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="main-mobile-menu lg:hidden">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`main-mobile-link ${isActive('/') ? 'active' : ''}`}
          >
            🏠 หน้าแรก
          </Link>
          <Link
            href="/builder"
            onClick={() => setMobileMenuOpen(false)}
            className={`main-mobile-link ${isActive('/builder') ? 'active' : ''}`}
          >
            🛠️ สร้างใบเสนอราคา
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`main-mobile-link ${isActive('/about') ? 'active' : ''}`}
          >
            ℹ️ เกี่ยวกับเรา
          </Link>
        </div>
      )}
    </header>
  );
}
