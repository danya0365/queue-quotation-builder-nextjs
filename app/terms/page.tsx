import { MainLayout } from "@/src/presentation/components/layout/MainLayout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ข้อกำหนดการใช้งาน | Queue Quote",
  description: "ข้อกำหนดและเงื่อนไขการใช้งาน Queue Quote ระบบจัดการคิวอัจฉริยะ",
};

export default function TermsPage() {
  return (
    <MainLayout showBubbles={false}>
      <div className="legal-page">
        <h1 className="legal-title">ข้อกำหนดการใช้งาน</h1>
        <p className="legal-updated">อัปเดตล่าสุด: 1 มกราคม 2026</p>

        <section className="legal-section">
          <h2>1. การยอมรับข้อกำหนด</h2>
          <p>
            โดยการใช้งาน Queue Quote คุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดเหล่านี้
            หากไม่เห็นด้วย กรุณาหยุดใช้งานบริการของเรา
          </p>
        </section>

        <section className="legal-section">
          <h2>2. ขอบเขตการให้บริการ</h2>
          <p>Queue Quote ให้บริการ:</p>
          <ul>
            <li>ระบบจัดการคิวอัจฉริยะ</li>
            <li>การสร้างใบเสนอราคาอัตโนมัติ</li>
            <li>บริการติดตั้งและฝึกอบรม</li>
            <li>การสนับสนุนทางเทคนิค</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. การชำระเงิน</h2>
          <ul>
            <li>ชำระ 50% เมื่อตกลงสั่งซื้อ</li>
            <li>ชำระ 50% เมื่อส่งมอบงาน</li>
            <li>ราคาไม่รวม VAT 7%</li>
            <li>ใบเสนอราคามีผล 30 วัน</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. การรับประกัน</h2>
          <p>เรารับประกันระบบเป็นระยะเวลา 1 ปี นับจากวันส่งมอบ โดยครอบคลุม:</p>
          <ul>
            <li>การแก้ไขข้อผิดพลาดของระบบ</li>
            <li>การอัปเดตซอฟต์แวร์</li>
            <li>การสนับสนุนทางเทคนิคผ่านทางโทรศัพท์และอีเมล</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>5. ข้อจำกัดความรับผิด</h2>
          <p>
            Queue Quote ไม่รับผิดชอบต่อความเสียหายทางอ้อม การสูญเสียรายได้
            หรือความเสียหายที่เกิดจากการใช้งานระบบในทางที่ผิด
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
