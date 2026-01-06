'use client';

import { formatPrice, getProjectTypeById } from '@/src/data/mock/mockFeatures';
import { useQuotationStore } from '@/src/store/quotationStore';
import Link from 'next/link';
import { useState } from 'react';

/**
 * SummaryPanel Component
 * Shows selected features, price calculation, and quote actions
 */
export function SummaryPanel() {
  const {
    projectType,
    selectedFeatures,
    discountPercent,
    getSubtotal,
    getDiscount,
    getTotal,
    getSelectedFeaturesData,
    setDiscountPercent,
    reset,
  } = useQuotationStore();

  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const selectedFeaturesData = getSelectedFeaturesData();
  const projectTypeData = projectType ? getProjectTypeById(projectType) : null;
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  // Show max 5 features, then toggle to show all
  const visibleFeatures = showAllFeatures
    ? selectedFeaturesData
    : selectedFeaturesData.slice(0, 5);
  const hiddenCount = selectedFeaturesData.length - 5;

  return (
    <aside className="builder-summary">
      <h3 className="builder-summary-title">
        📋 สรุปใบเสนอราคา
      </h3>

      {/* Selected Items */}
      <div className="builder-summary-items">
        {/* Project Type */}
        {projectTypeData && (
          <div className="builder-summary-item">
            <span className="builder-summary-item-name">
              {projectTypeData.icon} {projectTypeData.name} (Base)
            </span>
            <span className="builder-summary-item-price">
              {formatPrice(projectTypeData.basePrice)}
            </span>
          </div>
        )}

        {/* Features */}
        {visibleFeatures.map((feature) => (
          <div key={feature.id} className="builder-summary-item">
            <span className="builder-summary-item-name">
              {feature.name}
            </span>
            <span className="builder-summary-item-price">
              {feature.price === 0 ? '-' : formatPrice(feature.price)}
            </span>
          </div>
        ))}

        {/* Show More/Less */}
        {hiddenCount > 0 && (
          <button
            onClick={() => setShowAllFeatures(!showAllFeatures)}
            className="builder-summary-toggle"
          >
            {showAllFeatures ? '▲ แสดงน้อยลง' : `▼ แสดงเพิ่มอีก ${hiddenCount} รายการ`}
          </button>
        )}

        {/* Empty State */}
        {!projectTypeData && selectedFeaturesData.length === 0 && (
          <p className="builder-summary-empty">
            กรุณาเลือกประเภทธุรกิจและฟีเจอร์
          </p>
        )}
      </div>

      <div className="builder-summary-divider" />

      {/* Price Calculation */}
      <div className="space-y-2">
        <div className="builder-summary-row">
          <span>ราคารวม</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {/* Discount Input */}
        <div className="builder-summary-discount">
          <label>ส่วนลด (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(Number(e.target.value))}
            className="w-20 px-2 py-1 text-right rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {discount > 0 && (
          <div className="builder-summary-row discount">
            <span>ส่วนลด</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="builder-summary-divider" />

        <div className="builder-summary-row total">
          <span>ราคาสุทธิ</span>
          <span className="text-indigo-600 dark:text-indigo-400">
            {formatPrice(total)}
          </span>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          * ราคายังไม่รวม VAT 7%
        </p>
      </div>

      <div className="builder-summary-divider" />

      {/* Actions */}
      <div className="space-y-3">
        <Link
          href="/quote"
          className="main-btn main-btn-primary w-full justify-center"
        >
          📄 ดูใบเสนอราคา
        </Link>

        <button
          onClick={reset}
          className="main-btn main-btn-ghost w-full justify-center text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          🗑️ เริ่มใหม่
        </button>
      </div>

      {/* Feature Count */}
      <div className="mt-4 text-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          เลือกแล้ว {selectedFeatures.length} ฟีเจอร์
        </span>
      </div>
    </aside>
  );
}
