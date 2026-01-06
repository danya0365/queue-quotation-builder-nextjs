'use client';

import {
    LANDING_FAQ,
    LANDING_FEATURES,
    LANDING_STATS,
    type FAQ,
    type Feature,
    type Stat,
} from '@/src/data/mock/mockLandingData';
import Link from 'next/link';

/**
 * HomeView Component
 * Landing page with Hero, Features, Stats, and CTA sections
 */
export function HomeView() {
  return (
    <div className="h-full overflow-auto scrollbar-thin">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection features={LANDING_FEATURES} />

      {/* Stats Section */}
      <StatsSection stats={LANDING_STATS} />

      {/* FAQ Section */}
      <FAQSection faqs={LANDING_FAQ} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

// ============================================
// Hero Section
// ============================================
function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-content">
        {/* Badge */}
        <div className="landing-badge">
          <span>✨</span>
          <span>ใหม่! รองรับ LINE Official Account</span>
        </div>

        {/* Title */}
        <h1 className="landing-title">
          สร้างใบเสนอราคา
          <br />
          <span className="main-hero-gradient">Queue Management</span>
          <br />
          ง่ายๆ ไม่กี่คลิก
        </h1>

        {/* Subtitle */}
        <p className="landing-subtitle">
          คุณเลือกฟีเจอร์ที่ต้องการ เราคำนวณราคาให้ทันที
          <br />
          พร้อมคำอธิบายว่าแต่ละฟีเจอร์เหมาะกับธุรกิจแบบไหน
        </p>

        {/* Actions */}
        <div className="landing-actions">
          <Link href="/builder" className="landing-btn-primary">
            <span>🚀</span>
            <span>เริ่มสร้างใบเสนอราคา</span>
          </Link>
          <Link href="/about" className="landing-btn-secondary">
            <span>📖</span>
            <span>ดูตัวอย่างระบบ</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============================================
// Features Section
// ============================================
function FeaturesSection({ features }: { features: Feature[] }) {
  return (
    <section className="landing-features">
      <div className="landing-features-header">
        <h2 className="landing-features-title">
          ฟีเจอร์ที่คุณเลือกได้
        </h2>
        <p className="landing-features-subtitle">
          เลือกเฉพาะสิ่งที่ธุรกิจคุณต้องการ จ่ายเท่าที่ใช้
        </p>
      </div>

      <div className="landing-features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="landing-feature-card">
            <div className="landing-feature-icon">{feature.icon}</div>
            <h3 className="landing-feature-title">{feature.title}</h3>
            <p className="landing-feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// Stats Section
// ============================================
function StatsSection({ stats }: { stats: Stat[] }) {
  return (
    <section className="landing-stats">
      <div className="landing-stats-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="landing-stat">
            <div className="landing-stat-value">{stat.value}</div>
            <div className="landing-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================
// FAQ Section
// ============================================
function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          คำถามที่พบบ่อย
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA Section
// ============================================
function CTASection() {
  return (
    <section className="landing-cta">
      <h2 className="landing-cta-title">
        พร้อมที่จะเริ่มต้นหรือยัง?
      </h2>
      <p className="landing-cta-subtitle">
        สร้างใบเสนอราคาฟรี ไม่มีค่าใช้จ่ายใดๆ
        <br />
        ตัดสินใจได้ภายหลังเมื่อพร้อม
      </p>
      <Link href="/builder" className="landing-cta-btn">
        <span>📋</span>
        <span>สร้างใบเสนอราคาเลย</span>
      </Link>
    </section>
  );
}
