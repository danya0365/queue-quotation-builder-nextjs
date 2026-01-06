import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "นโยบายความเป็นส่วนตัว | Queue Quote",
  description: "นโยบายความเป็นส่วนตัวของ Queue Quote ระบบจัดการคิวอัจฉริยะ",
};

export default function PrivacyPage() {
  return (
    <MainLayout showBubbles={false}>
      <div className="legal-page">
        <h1 className="legal-title">นโยบายความเป็นส่วนตัว</h1>
        <p className="legal-updated">อัปเดตล่าสุด: 1 มกราคม 2026</p>

        <section className="legal-section">
          <h2>1. ข้อมูลที่เราเก็บรวบรวม</h2>
          <p>เราเก็บรวบรวมข้อมูลที่คุณให้ไว้โดยตรง เช่น:</p>
          <ul>
            <li>ชื่อและข้อมูลติดต่อของบริษัท</li>
            <li>อีเมลและเบอร์โทรศัพท์</li>
            <li>ข้อมูลการใช้งานระบบ</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>2. การใช้ข้อมูล</h2>
          <p>เราใช้ข้อมูลของคุณเพื่อ:</p>
          <ul>
            <li>ให้บริการและปรับปรุงระบบ</li>
            <li>ติดต่อสื่อสารเกี่ยวกับบริการ</li>
            <li>ส่งข้อมูลข่าวสารและโปรโมชั่น (หากได้รับอนุญาต)</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. การปกป้องข้อมูล</h2>
          <p>เรามีมาตรการรักษาความปลอดภัยที่เข้มงวด รวมถึง:</p>
          <ul>
            <li>การเข้ารหัสข้อมูล SSL</li>
            <li>การเก็บข้อมูลบนเซิร์ฟเวอร์ที่ปลอดภัย</li>
            <li>การควบคุมการเข้าถึงข้อมูล</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. ติดต่อเรา</h2>
          <p>
            หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ:{' '}
            <a href="mailto:privacy@queuequote.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              privacy@queuequote.com
            </a>
          </p>
        </section>

        <div className="legal-back">
          <Link href="/" className="main-btn main-btn-ghost">
            ← กลับหน้าแรก
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
