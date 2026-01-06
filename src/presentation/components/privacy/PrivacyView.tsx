import Link from 'next/link';

/**
 * PrivacyView Component
 * Privacy policy content
 * Following Clean Architecture - UI only
 */
export function PrivacyView() {
  return (
    <div className="legal-page">
      <h1 className="legal-title">นโยบายความเป็นส่วนตัว</h1>
      <p className="legal-updated">อัปเดตล่าสุด: 1 มกราคม 2026</p>

      {PRIVACY_SECTIONS.map((section, index) => (
        <section key={index} className="legal-section">
          <h2>{section.title}</h2>
          {section.content && <p>{section.content}</p>}
          {section.items && (
            <ul>
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {section.email && (
            <p>
              {section.content}{' '}
              <a
                href={`mailto:${section.email}`}
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {section.email}
              </a>
            </p>
          )}
        </section>
      ))}

      <div className="legal-back">
        <Link href="/" className="main-btn main-btn-ghost">
          ← กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}

// ============================================
// Content Data
// ============================================

const PRIVACY_SECTIONS = [
  {
    title: '1. ข้อมูลที่เราเก็บรวบรวม',
    content: 'เราเก็บรวบรวมข้อมูลที่คุณให้ไว้โดยตรง เช่น:',
    items: [
      'ชื่อและข้อมูลติดต่อของบริษัท',
      'อีเมลและเบอร์โทรศัพท์',
      'ข้อมูลการใช้งานระบบ',
    ],
  },
  {
    title: '2. การใช้ข้อมูล',
    content: 'เราใช้ข้อมูลของคุณเพื่อ:',
    items: [
      'ให้บริการและปรับปรุงระบบ',
      'ติดต่อสื่อสารเกี่ยวกับบริการ',
      'ส่งข้อมูลข่าวสารและโปรโมชั่น (หากได้รับอนุญาต)',
    ],
  },
  {
    title: '3. การปกป้องข้อมูล',
    content: 'เรามีมาตรการรักษาความปลอดภัยที่เข้มงวด รวมถึง:',
    items: [
      'การเข้ารหัสข้อมูล SSL',
      'การเก็บข้อมูลบนเซิร์ฟเวอร์ที่ปลอดภัย',
      'การควบคุมการเข้าถึงข้อมูล',
    ],
  },
  {
    title: '4. ติดต่อเรา',
    content: 'หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ:',
    email: 'marosdee.fuzana@gmail.com',
  },
];
