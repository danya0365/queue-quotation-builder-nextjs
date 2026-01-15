'use client';

import dayjs from 'dayjs';
import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * CookieConsent Component
 * PDPA-compliant cookie consent banner for Thailand
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: true,
      timestamp: dayjs().toISOString(),
      version: '1.0',
    }));
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: false,
      timestamp: dayjs().toISOString(),
      version: '1.0',
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <span className="cookie-consent-icon">🍪</span>
          <div>
            <p className="cookie-consent-title">เว็บไซต์นี้ใช้คุกกี้</p>
            <p className="cookie-consent-description">
              เราใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานและวิเคราะห์การเข้าชมเว็บไซต์ 
              ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA) คุณสามารถเลือกยอมรับหรือปฏิเสธได้{' '}
              <Link href="/privacy" className="cookie-consent-link">
                อ่านนโยบายความเป็นส่วนตัว
              </Link>
            </p>
          </div>
        </div>
        <div className="cookie-consent-actions">
          <button
            onClick={handleDecline}
            className="cookie-consent-btn decline"
          >
            ปฏิเสธ
          </button>
          <button
            onClick={handleAccept}
            className="cookie-consent-btn accept"
          >
            ยอมรับทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
}
