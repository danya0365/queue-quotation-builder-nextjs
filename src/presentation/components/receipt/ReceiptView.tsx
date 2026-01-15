'use client';

import { COMPANY_INFO } from '@/src/config/company.config';
import { getCategoryById } from '@/src/data/mock/mockFeatures';
import { useReceiptPresenter } from '@/src/presentation/hooks/useReceiptPresenter';


/**
 * ReceiptView Component
 * Print-friendly receipt view for payment confirmation
 * Following Clean Architecture - uses presenter hook for logic
 */
export function ReceiptView() {
  const {
    // Refs
    printRef,

    // State
    hasContent,

    // Receipt metadata
    receiptNumber,
    receiptDate,

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
    vatOption,

    // Customer data
    customerName,
    customerPhone,
    customerEmail,
    notes,

    // Payment data
    paymentMethod,
    paymentReference,
    paidDate,
    formattedPaidDate,

    // Actions
    handlePrint,
    updateCustomerName,
    updateCustomerPhone,
    updateCustomerEmail,
    updateNotes,
    updatePaymentMethod,
    updatePaymentReference,
    updatePaidDate,

    // Utilities
    formatPrice,
  } = useReceiptPresenter();

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
    return <ReceiptEmptyState />;
  }

  return (
    <div className="receipt-page">
      {/* Action Bar (hidden when printing) */}
      <div className="receipt-actions print-hidden">
        <a href="/builder" className="main-btn main-btn-ghost">
          ← กลับไป Builder
        </a>
        <div className="flex gap-2">
          <a href="/quote" className="main-btn main-btn-secondary">
            📋 ใบเสนอราคา
          </a>
          <a href="/invoice" className="main-btn main-btn-secondary">
            📝 ใบแจ้งหนี้
          </a>
          <button onClick={() => handlePrint()} className="main-btn main-btn-primary">
            🖨️ พิมพ์ใบเสร็จ
          </button>
        </div>
      </div>

      {/* Receipt Document */}
      <div ref={printRef} className="receipt-document">
        {/* Header */}
        <ReceiptHeader
          receiptNumber={receiptNumber}
          receiptDate={receiptDate}
          formattedPaidDate={formattedPaidDate}
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
          <section className="receipt-section">
            <h3 className="receipt-section-title">ประเภทธุรกิจ</h3>
            <div className="receipt-project-type">
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

        {/* Summary with Paid Status */}
        <ReceiptSummary
          subtotal={subtotal}
          discount={discount}
          discountPercent={discountPercent}
          total={total}
          vat={vat}
          grandTotal={grandTotal}
          vatOption={vatOption}
          formatPrice={formatPrice}
        />

        {/* Payment Info */}
        <PaymentInfoSection
          paymentMethod={paymentMethod}
          paymentReference={paymentReference}
          paidDate={paidDate}
          formattedPaidDate={formattedPaidDate}
          onMethodChange={updatePaymentMethod}
          onReferenceChange={updatePaymentReference}
          onDateChange={updatePaidDate}
        />

        {/* Notes */}
        <ReceiptNotes
          notes={notes}
          onNotesChange={updateNotes}
        />

        {/* Footer */}
        <ReceiptFooter />
      </div>
    </div>
  );
}

// ============================================
// Sub-components
// ============================================

function ReceiptEmptyState() {
  return (
    <div className="receipt-empty">
      <div className="receipt-empty-content">
        <span className="text-6xl mb-4">🧾</span>
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

interface ReceiptHeaderProps {
  receiptNumber: string;
  receiptDate: string;
  formattedPaidDate: string;
}

function ReceiptHeader({ receiptNumber, receiptDate, formattedPaidDate }: ReceiptHeaderProps) {
  return (
    <header className="receipt-header">
      <div className="receipt-company">
        <h1 className="receipt-company-name">
          <span className="text-green-600">Queue</span>
          <span className="text-gray-800 dark:text-white print:text-gray-800">Quote</span>
        </h1>
        <p className="text-sm text-gray-500">ระบบจัดการคิวอัจฉริยะ</p>
        <div className="receipt-badge">
          ✅ ใบเสร็จรับเงิน
        </div>
      </div>
      <div className="receipt-meta">
        <div className="receipt-meta-item">
          <span className="receipt-meta-label">เลขที่ใบเสร็จ</span>
          <span className="receipt-meta-value">{receiptNumber}</span>
        </div>
        <div className="receipt-meta-item">
          <span className="receipt-meta-label">วันที่ออก</span>
          <span className="receipt-meta-value">{receiptDate}</span>
        </div>
        <div className="receipt-meta-item">
          <span className="receipt-meta-label">วันที่ชำระ</span>
          <span className="receipt-meta-value text-green-600">{formattedPaidDate}</span>
        </div>
        <div className="receipt-status">
          <span className="receipt-status-badge">
            ✓ ชำระแล้ว
          </span>
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
    <section className="receipt-customer print-hidden">
      <h3 className="receipt-section-title">ข้อมูลลูกค้า</h3>
      <div className="receipt-customer-form">
        <input
          type="text"
          placeholder="ชื่อบริษัท/ร้านค้า"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
          className="receipt-input"
        />
        <input
          type="tel"
          placeholder="เบอร์โทรศัพท์"
          value={customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="receipt-input"
        />
        <input
          type="email"
          placeholder="อีเมล"
          value={customerEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          className="receipt-input"
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
    <section className="receipt-customer-print print-show" style={{ display: 'none' }}>
      <h3 className="receipt-section-title">ได้รับเงินจาก</h3>
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

const MAX_VISIBLE_ITEMS = 10;

function FeaturesTable({ projectTypeData, groupedFeatures, formatPrice }: FeaturesTableProps) {
  // Flatten all features for counting
  const allFeatures = Object.values(groupedFeatures).flat();
  
  // Calculate how many items we have (including base package if exists)
  const basePackageCount = projectTypeData ? 1 : 0;
  const totalItems = basePackageCount + allFeatures.length;
  
  // Determine if we need to collapse
  const needsCollapse = totalItems > MAX_VISIBLE_ITEMS;
  
  // Calculate visible items (reserve 1 row for summary if collapsing)
  const maxFeaturesToShow = needsCollapse 
    ? MAX_VISIBLE_ITEMS - basePackageCount - 1 // -1 for summary row
    : allFeatures.length;
  
  // Get visible and collapsed features
  const visibleFeatures = allFeatures.slice(0, maxFeaturesToShow);
  const collapsedFeatures = allFeatures.slice(maxFeaturesToShow);
  
  // Calculate collapsed items total
  const collapsedTotal = collapsedFeatures.reduce((sum, f) => sum + f.price, 0);
  const collapsedCount = collapsedFeatures.length;

  let rowIndex = 0;

  return (
    <section className="receipt-section">
      <h3 className="receipt-section-title">รายการ</h3>
      <table className="receipt-table">
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

          {/* Visible Features (no category headers to save space) */}
          {visibleFeatures.map((feature) => (
            <tr key={feature.id}>
              <td className="text-center">{++rowIndex}</td>
              <td>
                <div className="font-medium">{feature.name}</div>
              </td>
              <td className="text-center">
                <span className={`receipt-level level-${feature.level}`}>
                  {feature.level.charAt(0).toUpperCase() + feature.level.slice(1)}
                </span>
              </td>
              <td className="text-right font-mono">
                {feature.price === 0 ? 'รวมในแพ็กเกจ' : formatPrice(feature.price)}
              </td>
            </tr>
          ))}

          {/* Collapsed Summary Row */}
          {needsCollapse && collapsedCount > 0 && (
            <tr className="bg-gray-100 dark:bg-gray-700 print:bg-gray-100">
              <td className="text-center">{++rowIndex}</td>
              <td>
                <div className="font-semibold">รายการอื่นๆ อีก {collapsedCount} รายการ</div>
                <div className="text-xs text-gray-500">
                  {collapsedFeatures.map(f => f.name).join(', ')}
                </div>
              </td>
              <td className="text-center">-</td>
              <td className="text-right font-mono font-semibold">
                {collapsedTotal === 0 ? 'รวมในแพ็กเกจ' : formatPrice(collapsedTotal)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

interface ReceiptSummaryProps {
  subtotal: number;
  discount: number;
  discountPercent: number;
  total: number;
  vat: number;
  grandTotal: number;
  vatOption: 'include' | 'exclude' | 'exempt';
  formatPrice: (price: number) => string;
}

function ReceiptSummary({
  subtotal,
  discount,
  discountPercent,
  total,
  vat,
  grandTotal,
  vatOption,
  formatPrice,
}: ReceiptSummaryProps) {
  return (
    <section className="receipt-summary">
      <div className="receipt-summary-row">
        <span>รวมเป็นเงิน</span>
        <span className="font-mono">{formatPrice(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="receipt-summary-row text-green-600">
          <span>ส่วนลด {discountPercent > 0 ? `(${discountPercent}%)` : ''}</span>
          <span className="font-mono">-{formatPrice(discount)}</span>
        </div>
      )}
      <div className="receipt-summary-row total">
        <span>ราคาสุทธิ {vatOption === 'include' ? '(ก่อน VAT)' : ''}</span>
        <span className="font-mono">{formatPrice(total)}</span>
      </div>
      {vatOption === 'include' && (
        <div className="receipt-summary-row">
          <span>VAT 7%</span>
          <span className="font-mono">{formatPrice(vat)}</span>
        </div>
      )}
      <div className="receipt-summary-row grand-total paid">
        <span>
          💰 {vatOption === 'include' && 'ยอดที่ชำระแล้ว'}
          {vatOption === 'exclude' && 'ยอดที่ชำระแล้ว (ไม่รวม VAT)'}
          {vatOption === 'exempt' && 'ยอดที่ชำระแล้ว (ไม่คิด VAT)'}
        </span>
        <span className="font-mono text-green-600 print:text-green-700">
          {formatPrice(grandTotal)}
        </span>
      </div>
    </section>
  );
}

interface PaymentInfoSectionProps {
  paymentMethod: string;
  paymentReference: string;
  paidDate: string;
  formattedPaidDate: string;
  onMethodChange: (value: string) => void;
  onReferenceChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

function PaymentInfoSection({
  paymentMethod,
  paymentReference,
  paidDate,
  formattedPaidDate,
  onMethodChange,
  onReferenceChange,
  onDateChange,
}: PaymentInfoSectionProps) {
  return (
    <section className="receipt-payment">
      <h3 className="receipt-section-title">ข้อมูลการชำระเงิน</h3>
      
      {/* Editable form - hidden in print */}
      <div className="receipt-payment-form print-hidden">
        <div className="receipt-payment-grid">
          <div>
            <label className="receipt-label">วันที่ชำระ</label>
            <input
              type="date"
              value={paidDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="receipt-input"
            />
          </div>
          <div>
            <label className="receipt-label">ช่องทางชำระ</label>
            <select
              value={paymentMethod}
              onChange={(e) => onMethodChange(e.target.value)}
              className="receipt-input"
            >
              <option value="">เลือกช่องทาง</option>
              <option value="cash">เงินสด</option>
              <option value="transfer">โอนเงิน</option>
              <option value="credit">บัตรเครดิต</option>
              <option value="promptpay">PromptPay</option>
              <option value="cheque">เช็ค</option>
            </select>
          </div>
          <div>
            <label className="receipt-label">เลขอ้างอิง/หมายเหตุ</label>
            <input
              type="text"
              placeholder="เลขที่บัญชี, เลขอ้างอิง ฯลฯ"
              value={paymentReference}
              onChange={(e) => onReferenceChange(e.target.value)}
              className="receipt-input"
            />
          </div>
        </div>
      </div>

      {/* Print version */}
      <div className="receipt-payment-print hidden print:block">
        <div className="receipt-payment-info">
          <div className="receipt-payment-info-item">
            <span className="receipt-payment-info-label">วันที่ชำระ:</span>
            <span className="receipt-payment-info-value">{formattedPaidDate}</span>
          </div>
          {paymentMethod && (
            <div className="receipt-payment-info-item">
              <span className="receipt-payment-info-label">ช่องทาง:</span>
              <span className="receipt-payment-info-value">
                {paymentMethod === 'cash' && 'เงินสด'}
                {paymentMethod === 'transfer' && 'โอนเงิน'}
                {paymentMethod === 'credit' && 'บัตรเครดิต'}
                {paymentMethod === 'promptpay' && 'PromptPay'}
                {paymentMethod === 'cheque' && 'เช็ค'}
              </span>
            </div>
          )}
          {paymentReference && (
            <div className="receipt-payment-info-item">
              <span className="receipt-payment-info-label">เลขอ้างอิง:</span>
              <span className="receipt-payment-info-value">{paymentReference}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface ReceiptNotesProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

function ReceiptNotes({ notes, onNotesChange }: ReceiptNotesProps) {
  return (
    <section className="receipt-notes">
      <h3 className="receipt-section-title">หมายเหตุ</h3>
      <textarea
        placeholder="เพิ่มหมายเหตุ..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="receipt-input print-hidden"
        rows={2}
      />
      {notes && (
        <p className="receipt-notes-text hidden print:block whitespace-pre-wrap text-gray-700 mb-4">
          {notes}
        </p>
      )}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
        เอกสารนี้เป็นหลักฐานการรับเงินที่ออกโดยระบบ Queue Quote
      </p>
    </section>
  );
}

function ReceiptFooter() {
  return (
    <footer className="receipt-footer">
      <div className="receipt-signature">
        <div className="receipt-signature-box">
          <div className="receipt-signature-line" />
          <p>ผู้รับเงิน</p>
          <p className="text-sm text-gray-500">{COMPANY_INFO.name}</p>
        </div>
        <div className="receipt-signature-box">
          <div className="receipt-signature-line" />
          <p>ผู้ชำระเงิน</p>
          <p className="text-sm text-gray-500">ลูกค้า</p>
        </div>
      </div>
    </footer>
  );
}
