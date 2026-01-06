'use client';

import {
    calculatePackagePrice,
    FEATURE_CATEGORIES,
    FEATURES,
    formatPrice,
    getFeaturesByCategory,
    getMissingDependencies,
    getPackagesForProjectType,
    PROJECT_TYPES,
    type Feature,
    type FeatureLevel,
    type FeaturePackage,
} from '@/src/data/mock/mockFeatures';
import { useQuotationStore } from '@/src/store/quotationStore';
import { useMemo, useState } from 'react';
import { SummaryPanel } from './SummaryPanel';

/**
 * BuilderView Component
 * Main view for quotation builder page
 */
export function BuilderView() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showCustomize, setShowCustomize] = useState(false);
  const {
    projectType,
    selectedFeatures,
    setProjectType,
    toggleFeature,
    canSelectFeature,
    selectFeatures,
    setDiscountPercent,
  } = useQuotationStore();

  // Get packages for selected project type
  const availablePackages = useMemo(() => {
    if (!projectType) return [];
    return getPackagesForProjectType(projectType);
  }, [projectType]);

  // Filter features by category
  const filteredFeatures = useMemo(() => {
    if (activeCategory === 'all') {
      return FEATURES;
    }
    return getFeaturesByCategory(activeCategory);
  }, [activeCategory]);

  // Group features by category for display
  const groupedFeatures = useMemo(() => {
    const groups: Record<string, Feature[]> = {};
    filteredFeatures.forEach((feature) => {
      if (!groups[feature.categoryId]) {
        groups[feature.categoryId] = [];
      }
      groups[feature.categoryId].push(feature);
    });
    return groups;
  }, [filteredFeatures]);

  // Handle package selection
  const handleSelectPackage = (pkg: FeaturePackage) => {
    selectFeatures(pkg.features);
    setDiscountPercent(pkg.discountPercent);
    setShowCustomize(true); // Show features after selecting package
  };

  return (
    <div className="builder-page">
      <div className="builder-container">
        {/* Main Content */}
        <div className="builder-main">
          {/* Header */}
          <div className="builder-header">
            <h1 className="builder-title">
              สร้างใบเสนอราคา
            </h1>
            <p className="builder-subtitle">
              เลือกประเภทธุรกิจและแพ็กเกจที่ต้องการ หรือเลือกฟีเจอร์เอง
            </p>
          </div>

          {/* Step 1: Project Type Selection */}
          <ProjectTypeSection
            selectedType={projectType}
            onSelect={(id) => {
              setProjectType(id);
              selectFeatures([]); // Clear features when changing project type
              setShowCustomize(false);
            }}
          />

          {/* Step 2: Package Selection (shown after selecting project type) */}
          {projectType && !showCustomize && (
            <PackageSection
              packages={availablePackages}
              projectType={projectType}
              onSelectPackage={handleSelectPackage}
              onCustomize={() => setShowCustomize(true)}
            />
          )}

          {/* Step 3: Feature Customization (shown after selecting package or clicking customize) */}
          {projectType && showCustomize && (
            <>
              {/* Back to Packages */}
              <div className="mb-4">
                <button
                  onClick={() => setShowCustomize(false)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                >
                  ← กลับไปเลือกแพ็กเกจ
                </button>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />

              {/* Features Grid */}
              <div className="builder-features">
                {FEATURE_CATEGORIES.filter(
                  (cat) => activeCategory === 'all' || cat.id === activeCategory
                ).map((category) => {
                  const categoryFeatures = groupedFeatures[category.id];
                  if (!categoryFeatures?.length) return null;

                  return (
                    <div key={category.id} className="builder-category-group">
                      <h3 className="builder-category-title">
                        <span>{category.icon}</span>
                        <span className="ml-2">{category.name}</span>
                      </h3>
                      <div className="builder-features-grid">
                        {categoryFeatures.map((feature) => (
                          <FeatureCard
                            key={feature.id}
                            feature={feature}
                            isSelected={selectedFeatures.includes(feature.id)}
                            canSelect={canSelectFeature(feature.id)}
                            selectedFeatures={selectedFeatures}
                            onToggle={() => toggleFeature(feature.id)}
                            projectType={projectType}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Summary Panel */}
        <SummaryPanel />
      </div>
    </div>
  );
}

// ============================================
// Project Type Section
// ============================================
interface ProjectTypeSectionProps {
  selectedType: string | null;
  onSelect: (id: string | null) => void;
}

function ProjectTypeSection({ selectedType, onSelect }: ProjectTypeSectionProps) {
  return (
    <div className="builder-project-types">
      <h2 className="builder-section-title">
        1. เลือกประเภทธุรกิจ
      </h2>
      <div className="builder-project-grid">
        {PROJECT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(selectedType === type.id ? null : type.id)}
            className={`builder-project-card ${selectedType === type.id ? 'selected' : ''}`}
          >
            <span className="builder-project-icon">{type.icon}</span>
            <span className="builder-project-name">{type.name}</span>
            <span className="builder-project-price">
              เริ่มต้น {formatPrice(type.basePrice)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Package Section
// ============================================
interface PackageSectionProps {
  packages: FeaturePackage[];
  projectType: string;
  onSelectPackage: (pkg: FeaturePackage) => void;
  onCustomize: () => void;
}

function PackageSection({ packages, projectType, onSelectPackage, onCustomize }: PackageSectionProps) {
  return (
    <div className="builder-packages">
      <h2 className="builder-section-title">
        2. เลือกแพ็กเกจ
      </h2>
      <div className="builder-package-grid">
        {packages.map((pkg) => {
          const price = calculatePackagePrice(pkg, projectType);
          return (
            <button
              key={pkg.id}
              onClick={() => onSelectPackage(pkg)}
              className="builder-package-card"
            >
              {pkg.discountPercent > 0 && (
                <span className="builder-package-discount">
                  ลด {pkg.discountPercent}%
                </span>
              )}
              <span className="builder-package-icon">{pkg.icon}</span>
              <h3 className="builder-package-name">{pkg.name}</h3>
              <p className="builder-package-name-en">{pkg.nameEn}</p>
              <p className="builder-package-description">{pkg.description}</p>
              <div className="builder-package-features">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {pkg.features.length} ฟีเจอร์
                </span>
              </div>
              <div className="builder-package-price">
                {formatPrice(price)}
              </div>
            </button>
          );
        })}
        
        {/* Custom Option */}
        <button
          onClick={onCustomize}
          className="builder-package-card builder-package-custom"
        >
          <span className="builder-package-icon">🛠️</span>
          <h3 className="builder-package-name">กำหนดเอง</h3>
          <p className="builder-package-name-en">Custom</p>
          <p className="builder-package-description">
            เลือกฟีเจอร์ที่ต้องการด้วยตัวเอง
          </p>
          <div className="builder-package-features">
            <span className="text-sm text-indigo-600 dark:text-indigo-400">
              เลือกฟีเจอร์ →
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

// ============================================
// Category Filter
// ============================================
interface CategoryFilterProps {
  activeCategory: string;
  onSelect: (id: string) => void;
}

function CategoryFilter({ activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="builder-category-filter">
      <button
        onClick={() => onSelect('all')}
        className={`builder-category-btn ${activeCategory === 'all' ? 'active' : ''}`}
      >
        ทั้งหมด
      </button>
      {FEATURE_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`builder-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
        >
          <span>{cat.icon}</span>
          <span className="ml-1">{cat.name}</span>
        </button>
      ))}
    </div>
  );
}

// ============================================
// Feature Card
// ============================================
interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  canSelect: boolean;
  selectedFeatures: string[];
  onToggle: () => void;
  projectType: string | null;
}

function FeatureCard({
  feature,
  isSelected,
  canSelect,
  selectedFeatures,
  onToggle,
  projectType,
}: FeatureCardProps) {
  const missingDeps = getMissingDependencies(feature.id, selectedFeatures);
  const isRecommended = projectType && feature.recommendedFor.includes(projectType);
  const isDisabled = !canSelect && !isSelected;

  return (
    <div
      onClick={() => !isDisabled && onToggle()}
      className={`builder-feature-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
    >
      {/* Popular Badge */}
      {feature.isPopular && (
        <span className="builder-feature-popular">🔥 ยอดนิยม</span>
      )}

      {/* Recommended Badge - positioned below popular */}
      {isRecommended && !feature.isPopular && (
        <span className="builder-feature-recommended">✨ แนะนำ</span>
      )}

      {/* Header */}
      <div className="builder-feature-header">
        <div className="builder-feature-checkbox">
          {isSelected && '✓'}
        </div>
      </div>

      {/* Content */}
      <h4 className="builder-feature-name">{feature.name}</h4>
      <p className="builder-feature-description">{feature.description}</p>

      {/* Meta */}
      <div className="builder-feature-meta">
        <LevelBadge level={feature.level} />
        <span className="builder-feature-price">
          {feature.price === 0 ? 'รวมในแพ็คเกจ' : formatPrice(feature.price)}
        </span>
      </div>

      {/* Dependency Warning */}
      {missingDeps.length > 0 && !isSelected && (
        <div className="builder-feature-deps">
          ⚠️ ต้องเลือก: {missingDeps.map((d) => d.name).join(', ')}
        </div>
      )}
    </div>
  );
}

// ============================================
// Level Badge
// ============================================
function LevelBadge({ level }: { level: FeatureLevel }) {
  const labels: Record<FeatureLevel, string> = {
    basic: 'Basic',
    standard: 'Standard',
    premium: 'Premium',
  };

  return (
    <span className={`builder-feature-level level-${level}`}>
      {labels[level]}
    </span>
  );
}
