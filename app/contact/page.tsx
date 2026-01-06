import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ติดต่อเรา | Queue Quote",
  description: "ติดต่อทีมงาน Queue Quote ระบบจัดการคิวอัจฉริยะ โทร 02-xxx-xxxx",
};

export default function ContactPage() {
  return (
    <MainLayout showBubbles={false}>
      <div className="contact-page">
        <h1 className="contact-title">ติดต่อเรา</h1>
        <p className="contact-subtitle">
          พร้อมให้บริการและตอบทุกคำถาม
        </p>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-card">
              <span className="contact-icon">📞</span>
              <h3>โทรศัพท์</h3>
              <p>02-xxx-xxxx</p>
              <p className="text-sm text-gray-500">จันทร์-ศุกร์ 9:00-18:00</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📧</span>
              <h3>อีเมล</h3>
              <a href="mailto:hello@queuequote.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                hello@queuequote.com
              </a>
              <p className="text-sm text-gray-500">ตอบกลับภายใน 24 ชม.</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">💬</span>
              <h3>LINE Official</h3>
              <p className="text-green-600 font-semibold">@queuequote</p>
              <p className="text-sm text-gray-500">แชทตอบเร็วที่สุด</p>
            </div>

            <div className="contact-card">
              <span className="contact-icon">📍</span>
              <h3>สำนักงาน</h3>
              <p>123 อาคาร ABC ชั้น 5</p>
              <p className="text-sm text-gray-500">ถ.สุขุมวิท กรุงเทพฯ 10110</p>
            </div>
          </div>

          {/* Contact Form */}
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
        </div>

        <div className="contact-back">
          <Link href="/" className="main-btn main-btn-ghost">
            ← กลับหน้าแรก
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
