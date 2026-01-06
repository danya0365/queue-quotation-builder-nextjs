'use client';

import { getCategoryById } from '@/src/data/mock/mockFeatures';
import { useQuotePresenter } from '@/src/presentation/hooks/useQuotePresenter';
import { Fragment } from 'react';


/**
 * QuoteView Component
 * Print-friendly quotation view
 * Following Clean Architecture - uses presenter hook for logic
 */
export function QuoteView() {
  const {
    // Refs
    printRef,

    // State
    hasContent,

    // Quote metadata
    quoteNumber,
    quoteDate,
    validUntil,

    // Project data
    projectTypeData,

    // Features data
    selectedFeaturesData,

    // Price data
    subtotal,
    discount,
    discountPercent,
    total,
    vat,
    grandTotal,

    // Customer data
    customerName,
    customerPhone,
    customerEmail,
    notes,

    // Actions
    handlePrint,
    updateCustomerName,
    updateCustomerPhone,
    updateCustomerEmail,
    updateNotes,

    // Utilities
    formatPrice,
  } = useQuotePresenter();

  // Group features by category for display
  const groupedFeatures = selectedFeaturesData.reduce((acc, feature) => {
    const category = getCategoryById(feature.categoryId);
    const categoryName = category?.name ?? 'อื่นๆ';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(feature);
    return acc;
  }, {} as Record<string, typeof selectedFeaturesData>);

  // Empty state
  if (!hasContent) {
    return <QuoteEmptyState />;
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
        <QuoteHeader
          quoteNumber={quoteNumber}
          quoteDate={quoteDate}
          validUntil={validUntil}
        />

        {/* Customer Info (editable - hidden in print) */}
        <CustomerInfoForm
          customerName={customerName}
          customerPhone={customerPhone}
          customerEmail={customerEmail}
          onNameChange={updateCustomerName}
          onPhoneChange={updateCustomerPhone}
          onEmailChange={updateCustomerEmail}
        />

        {/* Customer Info (shown in print) */}
        <CustomerInfoPrint
          customerName={customerName}
          customerPhone={customerPhone}
          customerEmail={customerEmail}
        />

        {/* Project Type */}
        {projectTypeData && (
          <section className="quote-section">
            <h3 className="quote-section-title">ประเภทธุรกิจ</h3>
            <div className="quote-project-type">
              <span className="text-2xl mr-2">{projectTypeData.icon}</span>
              <span className="font-semibold">{projectTypeData.name}</span>
              <span className="text-gray-500 ml-2">({projectTypeData.nameEn})</span>
            </div>
          </section>
        )}

        {/* Features List */}
        <FeaturesTable
          projectTypeData={projectTypeData}
          groupedFeatures={groupedFeatures}
          formatPrice={formatPrice}
        />

        {/* Summary */}
        <QuoteSummary
          subtotal={subtotal}
          discount={discount}
          discountPercent={discountPercent}
          total={total}
          vat={vat}
          grandTotal={grandTotal}
          formatPrice={formatPrice}
        />

        {/* Notes */}
        <QuoteNotes
          notes={notes}
          onNotesChange={updateNotes}
        />

        {/* Footer */}
        <QuoteFooter />
      </div>
    </div>
  );
}

// ============================================
// Sub-components
// ============================================

function QuoteEmptyState() {
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

interface QuoteHeaderProps {
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
}

function QuoteHeader({ quoteNumber, quoteDate, validUntil }: QuoteHeaderProps) {
  return (
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
  );
}

interface CustomerInfoFormProps {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
}

function CustomerInfoForm({
  customerName,
  customerPhone,
  customerEmail,
  onNameChange,
  onPhoneChange,
  onEmailChange,
}: CustomerInfoFormProps) {
  return (
    <section className="quote-customer print-hidden">
      <h3 className="quote-section-title">ข้อมูลลูกค้า</h3>
      <div className="quote-customer-form">
        <input
          type="text"
          placeholder="ชื่อบริษัท/ร้านค้า"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
          className="quote-input"
        />
        <input
          type="tel"
          placeholder="เบอร์โทรศัพท์"
          value={customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="quote-input"
        />
        <input
          type="email"
          placeholder="อีเมล"
          value={customerEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          className="quote-input"
        />
      </div>
    </section>
  );
}

interface CustomerInfoPrintProps {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

function CustomerInfoPrint({
  customerName,
  customerPhone,
  customerEmail,
}: CustomerInfoPrintProps) {
  if (!customerName && !customerPhone && !customerEmail) return null;

  return (
    <section className="quote-customer-print print-show" style={{ display: 'none' }}>
      <h3 className="quote-section-title">เรียน</h3>
      <div className="space-y-1">
        {customerName && <p className="font-semibold">{customerName}</p>}
        {customerPhone && <p>โทร: {customerPhone}</p>}
        {customerEmail && <p>อีเมล: {customerEmail}</p>}
      </div>
    </section>
  );
}

interface FeaturesTableProps {
  projectTypeData: { icon: string; name: string; basePrice: number } | null | undefined;
  groupedFeatures: Record<string, { id: string; name: string; description: string; level: string; price: number }[]>;
  formatPrice: (price: number) => string;
}

function FeaturesTable({ projectTypeData, groupedFeatures, formatPrice }: FeaturesTableProps) {
  let rowIndex = 0;

  return (
    <section className="quote-section">
      <h3 className="quote-section-title">รายการฟีเจอร์</h3>
      <table className="quote-table">
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th>รายการ</th>
            <th className="text-center">Level</th>
            <th className="text-right">ราคา (บาท)</th>
          </tr>
        </thead>
        <tbody>
          {/* Base Package */}
          {projectTypeData && (
            <tr>
              <td className="text-center">{++rowIndex}</td>
              <td>
                <div className="font-semibold">ค่าติดตั้งระบบ ({projectTypeData.name})</div>
                <div className="text-xs text-gray-500">
                  รวมการ Setup, Training, และ Support 3 เดือน
                </div>
              </td>
              <td className="text-center">-</td>
              <td className="text-right font-mono">฿{projectTypeData.basePrice.toLocaleString()}</td>
            </tr>
          )}

          {/* Features by category */}
          {Object.entries(groupedFeatures).map(([categoryName, features]) => (
            <Fragment key={categoryName}>
              <tr className="bg-gray-50 dark:bg-gray-700/30 print:bg-gray-100">
                <td colSpan={4} className="font-semibold text-gray-700 dark:text-gray-300 print:text-gray-700">
                  {categoryName}
                </td>
              </tr>
              {features.map((feature) => (
                <tr key={feature.id}>
                  <td className="text-center">{++rowIndex}</td>
                  <td>
                    <div className="font-medium">{feature.name}</div>
                    <div className="text-xs text-gray-500">{feature.description}</div>
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
            </Fragment>
          ))}
        </tbody>
      </table>
    </section>
  );
}

interface QuoteSummaryProps {
  subtotal: number;
  discount: number;
  discountPercent: number;
  total: number;
  vat: number;
  grandTotal: number;
  formatPrice: (price: number) => string;
}

function QuoteSummary({
  subtotal,
  discount,
  discountPercent,
  total,
  vat,
  grandTotal,
  formatPrice,
}: QuoteSummaryProps) {
  return (
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
        <span className="font-mono">{formatPrice(vat)}</span>
      </div>
      <div className="quote-summary-row grand-total">
        <span>ยอดรวมทั้งสิ้น</span>
        <span className="font-mono text-indigo-600 print:text-indigo-600">
          {formatPrice(grandTotal)}
        </span>
      </div>
    </section>
  );
}

interface QuoteNotesProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

function QuoteNotes({ notes, onNotesChange }: QuoteNotesProps) {
  return (
    <section className="quote-notes">
      <h3 className="quote-section-title">หมายเหตุ</h3>
      <textarea
        placeholder="เพิ่มหมายเหตุหรือเงื่อนไขพิเศษ..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="quote-input print-hidden"
        rows={3}
      />
      {notes && (
        <p className="quote-notes-text hidden print:block whitespace-pre-wrap text-gray-700 mb-4">
          {notes}
        </p>
      )}
      <ul className="quote-terms">
        <li>ราคานี้มีผล 30 วันนับจากวันที่ออกใบเสนอราคา</li>
        <li>ราคารวมแล้วนี้รวมบริการ: ติดตั้ง, Training, Support 3 เดือน</li>
        <li>เงื่อนไขการชำระ: 50% เมื่อตกลง, 50% เมื่อส่งมอบงาน</li>
      </ul>
    </section>
  );
}

function QuoteFooter() {
  return (
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
          <p className="text-sm text-gray-500">ลูกค้า</p>
        </div>
      </div>
    </footer>
  );
}
