'use client';

import type { Feature, FeatureLevel, FeaturePackage, Platform } from '@/src/data/mock/mockFeatures';
import { useBuilderPresenter } from '@/src/presentation/hooks/useBuilderPresenter';
import { SummaryPanel } from './SummaryPanel';

/**
 * BuilderView Component
 * Main view for quotation builder page
 * Following Clean Architecture - uses presenter hook for logic
 */
export function BuilderView() {
  const {
    // Constants
    PROJECT_TYPES,
    PLATFORMS,
    FEATURE_CATEGORIES,

    // State
    projectType,
    selectedFeatures,
    selectedPlatforms,
    activeCategory,
    showCustomize,

    // Computed
    availablePackages,
    groupedFeatures,
    filteredCategories,

    // Actions
    handleSelectProjectType,
    handleSelectPackage,
    handleCustomize,
    handleBackToPackages,
    setActiveCategory,
    toggleFeature,
    togglePlatform,
    canSelectFeature,

    // Helpers
    isFeatureRecommended,
    getFeatureMissingDeps,
    getPackagePrice,
    formatPrice,
  } = useBuilderPresenter();

  return (
    <div className="builder-page">
      <div className="builder-container">
        {/* Main Content */}
        <div className="builder-main">
          {/* Header */}
          <div className="builder-header">
            <h1 className="builder-title">สร้างใบเสนอราคา</h1>
            <p className="builder-subtitle">
              เลือกประเภทธุรกิจและแพ็กเกจที่ต้องการ หรือเลือกฟีเจอร์เอง
            </p>
          </div>

          {/* Step 1: Project Type Selection */}
          <ProjectTypeSection
            projectTypes={PROJECT_TYPES}
            selectedType={projectType}
            onSelect={handleSelectProjectType}
            formatPrice={formatPrice}
          />

          {/* Step 2: Platform Selection (shown after selecting project type) */}
          {projectType && (
            <PlatformSection
              platforms={PLATFORMS}
              selectedPlatforms={selectedPlatforms}
              onToggle={togglePlatform}
              formatPrice={formatPrice}
            />
          )}

          {/* Step 3: Package Selection (shown after selecting project type) */}
          {projectType && !showCustomize && (
            <PackageSection
              packages={availablePackages}
              projectType={projectType}
              onSelectPackage={handleSelectPackage}
              onCustomize={handleCustomize}
              getPackagePrice={getPackagePrice}
              formatPrice={formatPrice}
            />
          )}

          {/* Step 4: Feature Customization */}
          {projectType && showCustomize && (
            <>
              {/* Back to Packages */}
              <div className="mb-4">
                <button
                  onClick={handleBackToPackages}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                >
                  ← กลับไปเลือกแพ็กเกจ
                </button>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={FEATURE_CATEGORIES}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
              />

              {/* Features Grid */}
              <div className="builder-features">
                {filteredCategories.map((category) => {
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
                            missingDeps={getFeatureMissingDeps(feature.id)}
                            isRecommended={isFeatureRecommended(feature)}
                            onToggle={() => toggleFeature(feature.id)}
                            formatPrice={formatPrice}
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
// Sub-components
// ============================================

interface ProjectTypeSectionProps {
  projectTypes: { id: string; name: string; icon: string; basePrice: number }[];
  selectedType: string | null;
  onSelect: (id: string | null) => void;
  formatPrice: (price: number) => string;
}

function ProjectTypeSection({
  projectTypes,
  selectedType,
  onSelect,
  formatPrice,
}: ProjectTypeSectionProps) {
  return (
    <div className="builder-project-types">
      <h2 className="builder-section-title">1. เลือกประเภทธุรกิจ</h2>
      <div className="builder-project-grid">
        {projectTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
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

interface PlatformSectionProps {
  platforms: Platform[];
  selectedPlatforms: string[];
  onToggle: (id: string) => void;
  formatPrice: (price: number) => string;
}

function PlatformSection({
  platforms,
  selectedPlatforms,
  onToggle,
  formatPrice,
}: PlatformSectionProps) {
  return (
    <div className="builder-platforms">
      <h2 className="builder-section-title">2. เลือก Platform</h2>
      <p className="builder-section-desc">เลือกแพลตฟอร์มที่ต้องการ (เลือกได้หลายรายการ)</p>
      <div className="builder-platform-grid">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => onToggle(platform.id)}
              className={`builder-platform-card ${isSelected ? 'selected' : ''}`}
            >
              <div className="builder-platform-checkbox">{isSelected && '✓'}</div>
              <span className="builder-platform-icon">{platform.icon}</span>
              <span className="builder-platform-name">{platform.name}</span>
              <span className="builder-platform-name-en">{platform.nameEn}</span>
              <span className="builder-platform-description">{platform.description}</span>
              <span className="builder-platform-price">
                {platform.basePrice === 0 ? 'รวมในราคา' : `+${formatPrice(platform.basePrice)}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface PackageSectionProps {
  packages: FeaturePackage[];
  projectType: string;
  onSelectPackage: (pkg: FeaturePackage) => void;
  onCustomize: () => void;
  getPackagePrice: (pkg: FeaturePackage) => number;
  formatPrice: (price: number) => string;
}

function PackageSection({
  packages,
  onSelectPackage,
  onCustomize,
  getPackagePrice,
  formatPrice,
}: PackageSectionProps) {
  return (
    <div className="builder-packages">
      <h2 className="builder-section-title">3. เลือกแพ็กเกจ</h2>
      <div className="builder-package-grid">
        {packages.map((pkg) => {
          const price = getPackagePrice(pkg);
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
              <div className="builder-package-price">{formatPrice(price)}</div>
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

interface CategoryFilterProps {
  categories: { id: string; name: string; icon: string }[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="builder-category-filter">
      <button
        onClick={() => onSelect('all')}
        className={`builder-category-btn ${activeCategory === 'all' ? 'active' : ''}`}
      >
        ทั้งหมด
      </button>
      {categories.map((cat) => (
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

interface FeatureCardProps {
  feature: Feature;
  isSelected: boolean;
  canSelect: boolean;
  missingDeps: Feature[];
  isRecommended: boolean;
  onToggle: () => void;
  formatPrice: (price: number) => string;
}

function FeatureCard({
  feature,
  isSelected,
  canSelect,
  missingDeps,
  isRecommended,
  onToggle,
  formatPrice,
}: FeatureCardProps) {
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

      {/* Recommended Badge */}
      {isRecommended && !feature.isPopular && (
        <span className="builder-feature-recommended">✨ แนะนำ</span>
      )}

      {/* Header */}
      <div className="builder-feature-header">
        <div className="builder-feature-checkbox">{isSelected && '✓'}</div>
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

function LevelBadge({ level }: { level: FeatureLevel }) {
  const labels: Record<FeatureLevel, string> = {
    basic: 'Basic',
    standard: 'Standard',
    premium: 'Premium',
  };

  return (
    <span className={`builder-feature-level level-${level}`}>{labels[level]}</span>
  );
}
