'use client';

/**
 * AboutView Component
 * Company and team information page
 */
export function AboutView() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1 className="about-hero-title">
          เราคือ <span className="text-gradient">Queue Quote</span>
        </h1>
        <p className="about-hero-subtitle">
          ผู้เชี่ยวชาญระบบจัดการคิวอัจฉริยะ ด้วยประสบการณ์กว่า 10 ปี
          ในการพัฒนาโซลูชันสำหรับธุรกิจทุกขนาด
        </p>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-stat">
          <span className="about-stat-value">500+</span>
          <span className="about-stat-label">ลูกค้าที่ไว้วางใจ</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-value">10+</span>
          <span className="about-stat-label">ปีประสบการณ์</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-value">99.9%</span>
          <span className="about-stat-label">Uptime</span>
        </div>
        <div className="about-stat">
          <span className="about-stat-value">24/7</span>
          <span className="about-stat-label">Support</span>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-card">
            <span className="about-card-icon">🎯</span>
            <h3 className="about-card-title">พันธกิจ</h3>
            <p className="about-card-text">
              พัฒนาระบบจัดการคิวที่ใช้งานง่าย ราคาเข้าถึงได้
              เพื่อช่วยให้ธุรกิจทุกขนาดสามารถให้บริการลูกค้าได้อย่างมีประสิทธิภาพ
            </p>
          </div>
          <div className="about-card">
            <span className="about-card-icon">🔭</span>
            <h3 className="about-card-title">วิสัยทัศน์</h3>
            <p className="about-card-text">
              เป็นผู้นำด้านระบบจัดการคิวอันดับ 1 ของประเทศไทย
              ด้วยเทคโนโลยี AI และ IoT ที่ล้ำสมัย
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-section">
        <h2 className="about-section-title">ทำไมต้องเลือกเรา?</h2>
        <div className="about-features-grid">
          <div className="about-feature">
            <span className="about-feature-icon">⚡</span>
            <h4 className="about-feature-title">ติดตั้งเร็ว</h4>
            <p className="about-feature-text">พร้อมใช้งานภายใน 24 ชั่วโมง</p>
          </div>
          <div className="about-feature">
            <span className="about-feature-icon">🛡️</span>
            <h4 className="about-feature-title">ปลอดภัย</h4>
            <p className="about-feature-text">ข้อมูลลูกค้าปลอดภัย 100%</p>
          </div>
          <div className="about-feature">
            <span className="about-feature-icon">📱</span>
            <h4 className="about-feature-title">ใช้ง่าย</h4>
            <p className="about-feature-text">ไม่ต้องมีความรู้ IT ก็ใช้ได้</p>
          </div>
          <div className="about-feature">
            <span className="about-feature-icon">💰</span>
            <h4 className="about-feature-title">คุ้มค่า</h4>
            <p className="about-feature-text">จ่ายแค่ฟีเจอร์ที่ใช้จริง</p>
          </div>
          <div className="about-feature">
            <span className="about-feature-icon">🔧</span>
            <h4 className="about-feature-title">ซัพพอร์ต</h4>
            <p className="about-feature-text">ทีมสนับสนุนตลอด 24 ชม.</p>
          </div>
          <div className="about-feature">
            <span className="about-feature-icon">📈</span>
            <h4 className="about-feature-title">อัพเดทฟรี</h4>
            <p className="about-feature-text">รับฟีเจอร์ใหม่โดยไม่มีค่าใช้จ่าย</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2 className="about-section-title">ทีมงานของเรา</h2>
        <div className="about-team-grid">
          <div className="about-team-member">
            <div className="about-team-avatar">👨‍💼</div>
            <h4 className="about-team-name">คุณสมชาย</h4>
            <p className="about-team-role">CEO & Founder</p>
          </div>
          <div className="about-team-member">
            <div className="about-team-avatar">👩‍💻</div>
            <h4 className="about-team-name">คุณสมหญิง</h4>
            <p className="about-team-role">CTO</p>
          </div>
          <div className="about-team-member">
            <div className="about-team-avatar">👨‍🎨</div>
            <h4 className="about-team-name">คุณนิรันดร์</h4>
            <p className="about-team-role">Lead Designer</p>
          </div>
          <div className="about-team-member">
            <div className="about-team-avatar">👩‍🔧</div>
            <h4 className="about-team-name">คุณปิยะ</h4>
            <p className="about-team-role">Support Lead</p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <h2 className="about-cta-title">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
        <p className="about-cta-subtitle">
          ติดต่อเราวันนี้ รับส่วนลดพิเศษสำหรับลูกค้าใหม่
        </p>
        <div className="about-cta-buttons">
          <a href="/builder" className="about-cta-btn primary">
            สร้างใบเสนอราคา
          </a>
          <a href="tel:021234567" className="about-cta-btn secondary">
            📞 02-123-4567
          </a>
        </div>
      </section>
    </div>
  );
}
