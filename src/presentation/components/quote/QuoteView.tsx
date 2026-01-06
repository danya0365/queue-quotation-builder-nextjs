'use client';

import {
  formatPrice,
  getCategoryById,
  getProjectTypeById,
} from '@/src/data/mock/mockFeatures';
import { useQuotationStore } from '@/src/store/quotationStore';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

/**
 * QuoteView Component
 * Print-friendly quotation view using react-to-print
 */
export function QuoteView() {
  const printRef = useRef<HTMLDivElement>(null);

  const {
    projectType,
    discountPercent,
    customerName,
    customerPhone,
    customerEmail,
    notes,
    getSubtotal,
    getDiscount,
    getTotal,
    getSelectedFeaturesData,
    setCustomerInfo,
    setNotes,
  } = useQuotationStore();

  const projectTypeData = projectType ? getProjectTypeById(projectType) : null;
  const selectedFeaturesData = getSelectedFeaturesData();
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  // Group features by category
  const groupedFeatures = selectedFeaturesData.reduce((acc, feature) => {
    const category = getCategoryById(feature.categoryId);
    const categoryName = category?.name ?? 'อื่นๆ';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(feature);
    return acc;
  }, {} as Record<string, typeof selectedFeaturesData>);

  // Quote number (mock)
  const quoteNumber = `QQ-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const quoteDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // React-to-print hook with compact 1-page layout
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `ใบเสนอราคา-${quoteNumber}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 8mm;
      }
      @media print {
        html, body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          font-size: 11px !important;
        }
        .print-hidden {
          display: none !important;
        }
        .print-show {
          display: block !important;
        }
        .quote-document {
          padding: 0 !important;
          box-shadow: none !important;
          border: none !important;
        }
        .quote-header {
          padding-bottom: 8px !important;
          margin-bottom: 8px !important;
        }
        .quote-section {
          margin-bottom: 8px !important;
        }
        .quote-section-title {
          font-size: 12px !important;
          margin-bottom: 4px !important;
          padding-bottom: 2px !important;
        }
        .quote-table th, .quote-table td {
          padding: 4px 6px !important;
          font-size: 10px !important;
        }
        .quote-summary {
          padding: 8px !important;
          margin-bottom: 8px !important;
        }
        .quote-summary-row {
          padding: 2px 0 !important;
          font-size: 11px !important;
        }
        .quote-summary-row.grand-total {
          padding: 4px 8px !important;
          font-size: 13px !important;
        }
        .quote-notes {
          margin-bottom: 8px !important;
        }
        .quote-terms {
          font-size: 9px !important;
          margin-top: 4px !important;
        }
        .quote-terms li {
          margin-bottom: 2px !important;
        }
        .quote-footer {
          padding-top: 8px !important;
        }
        .quote-signature-line {
          margin-top: 20px !important;
        }
        .quote-company-name {
          font-size: 20px !important;
        }
        .quote-project-type {
          padding: 6px !important;
          font-size: 12px !important;
        }
      }
    `,
  });

  if (!projectTypeData && selectedFeaturesData.length === 0) {
    return (
      <div className="quote-empty">
        <div className="quote-empty-content">
          <span className="text-6xl mb-4">📋</span>
          <h2 className="text-2xl font-bold mb-2">ยังไม่มีรายการ</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            กรุณาเลือกประเภทธุรกิจและฟีเจอร์ใน Builder ก่อน
          </p>
          <a href="/builder" className="main-btn main-btn-primary">
            ไปที่ Builder
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="quote-page">
      {/* Action Bar (hidden when printing) */}
      <div className="quote-actions print-hidden">
        <a href="/builder" className="main-btn main-btn-ghost">
          ← กลับไป Builder
        </a>
        <button onClick={() => handlePrint()} className="main-btn main-btn-primary">
          🖨️ พิมพ์ใบเสนอราคา
        </button>
      </div>

      {/* Quotation Document */}
      <div ref={printRef} className="quote-document">
        {/* Header */}
        <header className="quote-header">
          <div className="quote-company">
            <h1 className="quote-company-name">
              <span className="text-indigo-600">Queue</span>
              <span className="text-gray-800 dark:text-white print:text-gray-800">Quote</span>
            </h1>
            <p className="text-sm text-gray-500">ระบบจัดการคิวอัจฉริยะ</p>
          </div>
          <div className="quote-meta">
            <div className="quote-meta-item">
              <span className="quote-meta-label">เลขที่ใบเสนอราคา</span>
              <span className="quote-meta-value">{quoteNumber}</span>
            </div>
            <div className="quote-meta-item">
              <span className="quote-meta-label">วันที่</span>
              <span className="quote-meta-value">{quoteDate}</span>
            </div>
            <div className="quote-meta-item">
              <span className="quote-meta-label">ใช้ได้ถึง</span>
              <span className="quote-meta-value text-red-600">{validUntil}</span>
            </div>
          </div>
        </header>

        {/* Customer Info (editable - hidden in print) */}
        <section className="quote-customer print-hidden">
          <h3 className="quote-section-title">ข้อมูลลูกค้า</h3>
          <div className="quote-customer-form">
            <input
              type="text"
              placeholder="ชื่อบริษัท/ร้านค้า"
              value={customerName}
              onChange={(e) => setCustomerInfo({ name: e.target.value })}
              className="quote-input"
            />
            <input
              type="tel"
              placeholder="เบอร์โทรศัพท์"
              value={customerPhone}
              onChange={(e) => setCustomerInfo({ phone: e.target.value })}
              className="quote-input"
            />
            <input
              type="email"
              placeholder="อีเมล"
              value={customerEmail}
              onChange={(e) => setCustomerInfo({ email: e.target.value })}
              className="quote-input"
            />
          </div>
        </section>

        {/* Customer Info (shown in print) */}
        {(customerName || customerPhone || customerEmail) && (
          <section className="quote-customer-print print-show" style={{ display: 'none' }}>
            <h3 className="quote-section-title">เรียน</h3>
            <div className="space-y-1">
              {customerName && <p className="font-semibold">{customerName}</p>}
              {customerPhone && <p>โทร: {customerPhone}</p>}
              {customerEmail && <p>อีเมล: {customerEmail}</p>}
            </div>
          </section>
        )}

        {/* Project Type */}
        <section className="quote-section">
          <h3 className="quote-section-title">ประเภทธุรกิจ</h3>
          <div className="quote-project-type">
            <span className="text-2xl mr-2">{projectTypeData?.icon}</span>
            <span className="font-semibold">{projectTypeData?.name}</span>
            <span className="text-gray-500 ml-2">({projectTypeData?.nameEn})</span>
          </div>
        </section>

        {/* Features Table */}
        <section className="quote-section">
          <h3 className="quote-section-title">รายการฟีเจอร์</h3>
          <table className="quote-table">
            <thead>
              <tr>
                <th className="w-12 text-center">#</th>
                <th>รายการ</th>
                <th className="w-24 text-center">Level</th>
                <th className="w-32 text-right">ราคา (บาท)</th>
              </tr>
            </thead>
            <tbody>
              {/* Base Package */}
              {projectTypeData && (
                <tr className="bg-indigo-50 dark:bg-indigo-900/20 print:bg-indigo-50">
                  <td className="text-center">1</td>
                  <td>
                    <strong>ค่าติดตั้งระบบ ({projectTypeData.name})</strong>
                    <br />
                    <span className="text-sm text-gray-500">รวมการ Setup, Training, และ Support 3 เดือน</span>
                  </td>
                  <td className="text-center">-</td>
                  <td className="text-right font-mono">{formatPrice(projectTypeData.basePrice)}</td>
                </tr>
              )}

              {/* Features by Category */}
              {Object.entries(groupedFeatures).map(([categoryName, features], categoryIndex) => (
                <>
                  <tr key={categoryName} className="bg-gray-100 dark:bg-gray-800 print:bg-gray-100">
                    <td colSpan={4} className="font-semibold text-gray-700 dark:text-gray-300 print:text-gray-700">
                      {categoryName}
                    </td>
                  </tr>
                  {features.map((feature, featureIndex) => (
                    <tr key={feature.id}>
                      <td className="text-center">
                        {(projectTypeData ? 2 : 1) + 
                          Object.entries(groupedFeatures)
                            .slice(0, categoryIndex)
                            .reduce((sum, [, f]) => sum + f.length, 0) + 
                          featureIndex}
                      </td>
                      <td>
                        <strong>{feature.name}</strong>
                        <br />
                        <span className="text-sm text-gray-500">{feature.description}</span>
                      </td>
                      <td className="text-center">
                        <span className={`quote-level level-${feature.level}`}>
                          {feature.level.charAt(0).toUpperCase() + feature.level.slice(1)}
                        </span>
                      </td>
                      <td className="text-right font-mono">
                        {feature.price === 0 ? 'รวมในแพ็กเกจ' : formatPrice(feature.price)}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </section>

        {/* Summary */}
        <section className="quote-summary">
          <div className="quote-summary-row">
            <span>รวมเป็นเงิน</span>
            <span className="font-mono">{formatPrice(subtotal)}</span>
          </div>
          {discount > 0 && (
            <div className="quote-summary-row text-green-600">
              <span>ส่วนลด ({discountPercent}%)</span>
              <span className="font-mono">-{formatPrice(discount)}</span>
            </div>
          )}
          <div className="quote-summary-row total">
            <span>ราคาสุทธิ (ก่อน VAT)</span>
            <span className="font-mono">{formatPrice(total)}</span>
          </div>
          <div className="quote-summary-row">
            <span>VAT 7%</span>
            <span className="font-mono">{formatPrice(Math.round(total * 0.07))}</span>
          </div>
          <div className="quote-summary-row grand-total">
            <span>ยอดรวมทั้งสิ้น</span>
            <span className="font-mono text-indigo-600 print:text-indigo-600">
              {formatPrice(Math.round(total * 1.07))}
            </span>
          </div>
        </section>

        {/* Notes */}
        <section className="quote-notes">
          <h3 className="quote-section-title">หมายเหตุ</h3>
          <textarea
            placeholder="เพิ่มหมายเหตุหรือเงื่อนไขพิเศษ..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="quote-input print-hidden"
            rows={3}
          />
          {notes && (
            <p className="print-show whitespace-pre-wrap" style={{ display: 'none' }}>{notes}</p>
          )}
          <ul className="quote-terms">
            <li>ราคานี้มีผล 30 วันนับจากวันที่ออกใบเสนอราคา</li>
            <li>ราคารวมแล้วนี้รวมบริการ: ติดตั้ง, Training, Support 3 เดือน</li>
            <li>เงื่อนไขการชำระ: 50% เมื่อตกลง, 50% เมื่อส่งมอบงาน</li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="quote-footer">
          <div className="quote-signature">
            <div className="quote-signature-box">
              <div className="quote-signature-line" />
              <p>ผู้เสนอราคา</p>
              <p className="text-sm text-gray-500">Queue Quote Co., Ltd.</p>
            </div>
            <div className="quote-signature-box">
              <div className="quote-signature-line" />
              <p>ผู้อนุมัติ</p>
              <p className="text-sm text-gray-500">{customerName || 'ลูกค้า'}</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Queue Quote - ระบบจัดการคิวอัจฉริยะ | www.queuequote.com | 02-xxx-xxxx
          </p>
        </footer>
      </div>
    </div>
  );
}
