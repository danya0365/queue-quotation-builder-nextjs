'use client';

import Link from 'next/link';

/**
 * ContactView Component
 * Contact page with info cards and form
 * Following Clean Architecture - UI only, no business logic
 */
export function ContactView() {
  return (
    <div className="contact-page">
      <h1 className="contact-title">ติดต่อเรา</h1>
      <p className="contact-subtitle">
        พร้อมให้บริการและตอบทุกคำถาม
      </p>

      <div className="contact-grid">
        {/* Contact Info */}
        <ContactInfoCards />

        {/* Contact Form */}
        <ContactForm />
      </div>

      <div className="contact-back">
        <Link href="/" className="main-btn main-btn-ghost">
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}

// ============================================
// Sub-components
// ============================================

const CONTACT_INFO = [
  {
    icon: '📞',
    title: 'โทรศัพท์',
    content: '02-xxx-xxxx',
    subtitle: 'จันทร์-ศุกร์ 9:00-18:00',
  },
  {
    icon: '📧',
    title: 'อีเมล',
    content: 'hello@queuequote.com',
    isLink: true,
    subtitle: 'ตอบกลับภายใน 24 ชม.',
  },
  {
    icon: '💬',
    title: 'LINE Official',
    content: '@queuequote',
    contentClass: 'text-green-600 font-semibold',
    subtitle: 'แชทตอบเร็วที่สุด',
  },
  {
    icon: '📍',
    title: 'สำนักงาน',
    content: '123 อาคาร ABC ชั้น 5',
    subtitle: 'ถ.สุขุมวิท กรุงเทพฯ 10110',
  },
];

function ContactInfoCards() {
  return (
    <div className="contact-info">
      {CONTACT_INFO.map((info) => (
        <div key={info.title} className="contact-card">
          <span className="contact-icon">{info.icon}</span>
          <h3>{info.title}</h3>
          {info.isLink ? (
            <a
              href={`mailto:${info.content}`}
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              {info.content}
            </a>
          ) : (
            <p className={info.contentClass}>{info.content}</p>
          )}
          <p className="text-sm text-gray-500">{info.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

function ContactForm() {
  return (
    <div className="contact-form-container">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        ส่งข้อความถึงเรา
      </h2>
      <form className="contact-form">
        <div className="form-group">
          <label>ชื่อ-นามสกุล</label>
          <input type="text" placeholder="กรอกชื่อของคุณ" className="form-input" />
        </div>
        <div className="form-group">
          <label>อีเมล</label>
          <input type="email" placeholder="email@example.com" className="form-input" />
        </div>
        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input type="tel" placeholder="0xx-xxx-xxxx" className="form-input" />
        </div>
        <div className="form-group">
          <label>ข้อความ</label>
          <textarea placeholder="กรอกข้อความของคุณ..." className="form-input" rows={4} />
        </div>
        <button type="submit" className="main-btn main-btn-primary w-full justify-center">
          📨 ส่งข้อความ
        </button>
      </form>
    </div>
  );
}
