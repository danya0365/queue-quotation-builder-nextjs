'use client';

import { COMPANY_INFO, PAYMENT_CONTACT, PROMPTPAY_INFO, getPrimaryBankAccount } from '@/src/config/company.config';
import { INVOICE_TERMS, VAT_CONFIG } from '@/src/config/quotation.config';
import { getCategoryById } from '@/src/data/mock/mockFeatures';
import { useInvoicePresenter } from '@/src/presentation/hooks/useInvoicePresenter';
import { Fragment } from 'react';


/**
 * InvoiceView Component
 * Print-friendly invoice view for payment request
 * Following Clean Architecture - uses presenter hook for logic
 */
export function InvoiceView() {
  const {
    // Refs
    printRef,

    // State
    hasContent,

    // Invoice metadata
    invoiceNumber,
    invoiceDate,
    dueDate,
    formattedDueDate,

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

    // Actions
    handlePrint,
    updateCustomerName,
    updateCustomerPhone,
    updateCustomerEmail,
    updateNotes,
    updateDueDate,

    // Utilities
    formatPrice,
  } = useInvoicePresenter();

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
    return <InvoiceEmptyState />;
  }

  return (
    <div className="invoice-page">
      {/* Action Bar (hidden when printing) */}
      <div className="invoice-actions print-hidden">
        <a href="/builder" className="main-btn main-btn-ghost">
          ← กลับไป Builder
        </a>
        <div className="flex gap-2">
          <a href="/quote" className="main-btn main-btn-secondary">
            📋 ใบเสนอราคา
          </a>
          <a href="/receipt" className="main-btn main-btn-secondary">
            🧾 ใบเสร็จ
          </a>
          <button onClick={() => handlePrint()} className="main-btn main-btn-primary">
            🖨️ พิมพ์ใบแจ้งหนี้
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div ref={printRef} className="invoice-document">
        {/* Header */}
        <InvoiceHeader
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          formattedDueDate={formattedDueDate}
        />

        {/* Due Date Editor (hidden in print) */}
        <DueDateEditor
          dueDate={dueDate}
          onDueDateChange={updateDueDate}
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
          <section className="invoice-section">
            <h3 className="invoice-section-title">ประเภทธุรกิจ</h3>
            <div className="invoice-project-type">
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
        <InvoiceSummary
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
        <PaymentInfo />

        {/* Notes */}
        <InvoiceNotes
          notes={notes}
          onNotesChange={updateNotes}
        />

        {/* Footer */}
        <InvoiceFooter />
      </div>
    </div>
  );
}

// ============================================
// Sub-components
// ============================================

function InvoiceEmptyState() {
  return (
    <div className="invoice-empty">
      <div className="invoice-empty-content">
        <span className="text-6xl mb-4">📝</span>
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

interface InvoiceHeaderProps {
  invoiceNumber: string;
  invoiceDate: string;
  formattedDueDate: string;
}

function InvoiceHeader({ invoiceNumber, invoiceDate, formattedDueDate }: InvoiceHeaderProps) {
  return (
    <header className="invoice-header">
      <div className="invoice-company">
        <h1 className="invoice-company-name">
          <span className="text-orange-600">Queue</span>
          <span className="text-gray-800 dark:text-white print:text-gray-800">Quote</span>
        </h1>
        <p className="text-sm text-gray-500">ระบบจัดการคิวอัจฉริยะ</p>
        <div className="invoice-badge">
          📝 ใบแจ้งหนี้
        </div>
      </div>
      <div className="invoice-meta">
        <div className="invoice-meta-item">
          <span className="invoice-meta-label">เลขที่ใบแจ้งหนี้</span>
          <span className="invoice-meta-value">{invoiceNumber}</span>
        </div>
        <div className="invoice-meta-item">
          <span className="invoice-meta-label">วันที่ออก</span>
          <span className="invoice-meta-value">{invoiceDate}</span>
        </div>
        <div className="invoice-meta-item">
          <span className="invoice-meta-label">ครบกำหนดชำระ</span>
          <span className="invoice-meta-value text-orange-600 font-bold">{formattedDueDate}</span>
        </div>
        <div className="invoice-status">
          <span className="invoice-status-badge">
            ⏳ รอชำระเงิน
          </span>
        </div>
      </div>
    </header>
  );
}

interface DueDateEditorProps {
  dueDate: string;
  onDueDateChange: (value: string) => void;
}

function DueDateEditor({ dueDate, onDueDateChange }: DueDateEditorProps) {
  return (
    <section className="invoice-due-date-editor print-hidden">
      <label className="invoice-label">
        วันครบกำหนดชำระ
      </label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => onDueDateChange(e.target.value)}
        className="invoice-input w-auto"
      />
    </section>
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
    <section className="invoice-customer print-hidden">
      <h3 className="invoice-section-title">ข้อมูลลูกค้า</h3>
      <div className="invoice-customer-form">
        <input
          type="text"
          placeholder="ชื่อบริษัท/ร้านค้า"
          value={customerName}
          onChange={(e) => onNameChange(e.target.value)}
          className="invoice-input"
        />
        <input
          type="tel"
          placeholder="เบอร์โทรศัพท์"
          value={customerPhone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="invoice-input"
        />
        <input
          type="email"
          placeholder="อีเมล"
          value={customerEmail}
          onChange={(e) => onEmailChange(e.target.value)}
          className="invoice-input"
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
    <section className="invoice-customer-print print-show" style={{ display: 'none' }}>
      <h3 className="invoice-section-title">เรียกเก็บเงินจาก</h3>
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
    <section className="invoice-section">
      <h3 className="invoice-section-title">รายการฟีเจอร์</h3>
      <table className="invoice-table">
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
                    <span className={`invoice-level level-${feature.level}`}>
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

interface InvoiceSummaryProps {
  subtotal: number;
  discount: number;
  discountPercent: number;
  total: number;
  vat: number;
  grandTotal: number;
  vatOption: 'include' | 'exclude' | 'exempt';
  formatPrice: (price: number) => string;
}

function InvoiceSummary({
  subtotal,
  discount,
  discountPercent,
  total,
  vat,
  grandTotal,
  vatOption,
  formatPrice,
}: InvoiceSummaryProps) {
  return (
    <section className="invoice-summary">
      <div className="invoice-summary-row">
        <span>รวมเป็นเงิน</span>
        <span className="font-mono">{formatPrice(subtotal)}</span>
      </div>
      {discount > 0 && (
        <div className="invoice-summary-row text-green-600">
          <span>ส่วนลด {discountPercent > 0 ? `(${discountPercent}%)` : ''}</span>
          <span className="font-mono">-{formatPrice(discount)}</span>
        </div>
      )}
      <div className="invoice-summary-row total">
        <span>ราคาสุทธิ {vatOption === 'include' ? '(ก่อน VAT)' : ''}</span>
        <span className="font-mono">{formatPrice(total)}</span>
      </div>
      {vatOption === 'include' && (
        <div className="invoice-summary-row">
          <span>VAT {VAT_CONFIG.ratePercent}%</span>
          <span className="font-mono">{formatPrice(vat)}</span>
        </div>
      )}
      <div className="invoice-summary-row grand-total">
        <span>
          💰 {vatOption === 'include' && 'ยอดที่ต้องชำระ'}
          {vatOption === 'exclude' && 'ยอดที่ต้องชำระ (ไม่รวม VAT)'}
          {vatOption === 'exempt' && 'ยอดที่ต้องชำระ (ไม่คิด VAT)'}
        </span>
        <span className="font-mono text-orange-600 print:text-orange-700">
          {formatPrice(grandTotal)}
        </span>
      </div>
    </section>
  );
}

function PaymentInfo() {
  const bank = getPrimaryBankAccount();
  
  return (
    <section className="invoice-payment">
      <h3 className="invoice-section-title">ช่องทางการชำระเงิน</h3>
      <div className="invoice-payment-details">
        <div className="invoice-payment-method">
          <div className="invoice-payment-method-title">{bank.icon} โอนเงินผ่านธนาคาร</div>
          <div className="invoice-payment-method-content">
            <p><strong>ธนาคาร:</strong> {bank.bankName}</p>
            <p><strong>เลขบัญชี:</strong> {bank.accountNo}</p>
            <p><strong>ชื่อบัญชี:</strong> {bank.accountName}</p>
          </div>
        </div>
        <div className="invoice-payment-method">
          <div className="invoice-payment-method-title">{PROMPTPAY_INFO.icon} PromptPay</div>
          <div className="invoice-payment-method-content">
            <p><strong>เลขพร้อมเพย์:</strong> {PROMPTPAY_INFO.number}</p>
            <p><strong>ชื่อ:</strong> {PROMPTPAY_INFO.name}</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        {PAYMENT_CONTACT.instruction}
      </p>
    </section>
  );
}

interface InvoiceNotesProps {
  notes: string;
  onNotesChange: (value: string) => void;
}

function InvoiceNotes({ notes, onNotesChange }: InvoiceNotesProps) {
  return (
    <section className="invoice-notes">
      <h3 className="invoice-section-title">หมายเหตุ</h3>
      <textarea
        placeholder="เพิ่มหมายเหตุหรือเงื่อนไขพิเศษ..."
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        className="invoice-input print-hidden"
        rows={3}
      />
      {notes && (
        <p className="invoice-notes-text hidden print:block whitespace-pre-wrap text-gray-700 mb-4">
          {notes}
        </p>
      )}
      <ul className="invoice-terms">
        {INVOICE_TERMS.map((term, idx) => (
          <li key={idx}>{term}</li>
        ))}
        <li>หากมีข้อสงสัย กรุณาติดต่อ {COMPANY_INFO.phone}</li>
      </ul>
    </section>
  );
}

function InvoiceFooter() {
  return (
    <footer className="invoice-footer">
      <div className="invoice-signature">
        <div className="invoice-signature-box">
          <div className="invoice-signature-line" />
          <p>ผู้ออกใบแจ้งหนี้</p>
          <p className="text-sm text-gray-500">{COMPANY_INFO.name}</p>
        </div>
        <div className="invoice-signature-box">
          <div className="invoice-signature-line" />
          <p>ผู้รับใบแจ้งหนี้</p>
          <p className="text-sm text-gray-500">ลูกค้า</p>
        </div>
      </div>
    </footer>
  );
}
