import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronDown, 
  faChevronUp, 
  faTimes, 
  faSearch, 
  faSliders,
  faCheck,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import "./ProductFilter.scss";

interface ProductFilterProps {
  onFilterChange: (filter: any) => void;
}

interface FilterSection {
  id: string;
  title: string;
  isCollapsed: boolean;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
  const [filter, setFilter] = useState({
    type: [] as string[],
    manufacturer: [] as string[],
    genres: [] as string[],
    minPrice: 0,
    maxPrice: 0
  });

  const [sections, setSections] = useState<FilterSection[]>([
    { id: 'type', title: 'Loại sản phẩm', isCollapsed: false },
    { id: 'manufacturer', title: 'Thương hiệu', isCollapsed: false },
    { id: 'genres', title: 'Thể loại', isCollapsed: false },
    { id: 'price', title: 'Khoảng giá', isCollapsed: false }
  ]);

  const [searchTerms, setSearchTerms] = useState({
    type: '',
    manufacturer: '',
    genres: ''
  });

  const type = ["Máy chơi game", "Phụ kiện", "Đĩa game"];
  const manufacturer = ["Sony", "Microsoft", "Nintendo"];
  const genre = [
    "Hành động",
    "Nhập vai", 
    "Thường",
    "Bắn súng",
    "Thể thao",
    "Kinh dị",
    "Sinh tồn",
    "Phiêu lưu",
    "Đua xe",
    "Giải đố"
  ];

  const handleFilterClick = () => {
    onFilterChange(filter);
  };

  const handleClearAll = () => {
    const clearedFilter = {
      type: [],
      manufacturer: [],
      genres: [],
      minPrice: 0,
      maxPrice: 0
    };
    setFilter(clearedFilter);
    onFilterChange(clearedFilter);
  };

  const toggleSection = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, isCollapsed: !section.isCollapsed }
          : section
      )
    );
  };

  const handleCheckboxChanges = (checkboxType: keyof typeof filter, item: string, checked: boolean) => {
    setFilter(prev => ({
      ...prev, 
      [checkboxType]: checked
        ? [...(prev[checkboxType] as string[]), item]
        : [...(prev[checkboxType] as string[]).filter(choice => choice !== item)]
    }));
  };

  const handleSearchChange = (sectionType: keyof typeof searchTerms, value: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [sectionType]: value
    }));
  };

  const getFilteredItems = (items: string[], sectionType: keyof typeof searchTerms) => {
    const searchTerm = searchTerms[sectionType].toLowerCase();
    return items.filter(item => 
      item.toLowerCase().includes(searchTerm)
    );
  };

  const getActiveFiltersCount = () => {
    return filter.type.length + filter.manufacturer.length + filter.genres.length + 
           (filter.minPrice > 0 ? 1 : 0) + (filter.maxPrice > 0 ? 1 : 0);
  };

  const renderCheckboxList = (items: string[], checkboxType: keyof typeof filter, sectionType: keyof typeof searchTerms) => {
    const filteredItems = getFilteredItems(items, sectionType);
    
    if (filteredItems.length === 0) {
      return (
        <div className="no-results">
          <FontAwesomeIcon icon={faSearch} />
          <span>Không tìm thấy kết quả</span>
        </div>
      );
    }

    return filteredItems.map((item) => (
      <li key={item} className="filter-item">
        <label className="checkbox-container">
          <input 
            type="checkbox" 
            checked={Array.isArray(filter[checkboxType]) && filter[checkboxType].includes(item)}
            onChange={e => handleCheckboxChanges(checkboxType, item, e.target.checked)}
          />
          <span className="checkmark">
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className="label-text">{item}</span>
        </label>
      </li>
    ));
  };

  const renderFilterSection = (
    sectionId: string, 
    title: string, 
    items: string[], 
    checkboxType: keyof typeof filter,
    searchType: keyof typeof searchTerms
  ) => {
    const section = sections.find(s => s.id === sectionId);
    const selectedCount = (filter[checkboxType] as string[]).length;

    return (
      <div className="filter-section">
        <div 
          className="section-header"
          onClick={() => toggleSection(sectionId)}
        >
          <div className="section-title">
            <h3>{title}</h3>
            {selectedCount > 0 && (
              <span className="selected-count">{selectedCount}</span>
            )}
          </div>
          <FontAwesomeIcon 
            icon={section?.isCollapsed ? faChevronDown : faChevronUp} 
            className="collapse-icon"
          />
        </div>
        
        {!section?.isCollapsed && (
          <div className="section-content">
            {items.length > 5 && (
              <div className="search-box">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder={`Tìm kiếm ${title.toLowerCase()}...`}
                  value={searchTerms[searchType]}
                  onChange={e => handleSearchChange(searchType, e.target.value)}
                  className="search-input"
                />
              </div>
            )}
            <ul className="filter-list">
              {renderCheckboxList(items, checkboxType, searchType)}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Auto-apply filters when they change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filter);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [filter.type, filter.manufacturer, filter.genres, filter.minPrice, filter.maxPrice, onFilterChange]);
  
  return (
    <div className="product-filter-container">
      {/* Filter Header */}
      <div className="filter-header">
        <div className="header-title">
          <FontAwesomeIcon icon={faSliders} />
          <h2>Bộ lọc</h2>
        </div>
        {getActiveFiltersCount() > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            <FontAwesomeIcon icon={faTimes} />
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {getActiveFiltersCount() > 0 && (
        <div className="active-filters">
          <div className="active-filters-header">
            <span>Bộ lọc đang áp dụng ({getActiveFiltersCount()})</span>
          </div>
          <div className="active-filter-tags">
            {[...filter.type, ...filter.manufacturer, ...filter.genres].map((filterValue, index) => (
              <span key={index} className="filter-tag">
                {filterValue}
                <button 
                  onClick={() => {
                    // Remove specific filter
                    const filterType = type.includes(filterValue) ? 'type' : 
                                     manufacturer.includes(filterValue) ? 'manufacturer' : 'genres';
                    handleCheckboxChanges(filterType, filterValue, false);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Filter Sections */}
      <div className="filter-sections">
        {renderFilterSection('type', 'Loại sản phẩm', type, 'type', 'type')}
        {renderFilterSection('manufacturer', 'Thương hiệu', manufacturer, 'manufacturer', 'manufacturer')}
        {renderFilterSection('genres', 'Thể loại', genre, 'genres', 'genres')}

        {/* Price Range Section */}
        <div className="filter-section">
          <div 
            className="section-header"
            onClick={() => toggleSection('price')}
          >
            <div className="section-title">
              <h3>
                <FontAwesomeIcon icon={faDollarSign} />
                Khoảng giá
              </h3>
              {(filter.minPrice > 0 || filter.maxPrice > 0) && (
                <span className="selected-count">1</span>
              )}
            </div>
            <FontAwesomeIcon 
              icon={sections.find(s => s.id === 'price')?.isCollapsed ? faChevronDown : faChevronUp} 
              className="collapse-icon"
            />
          </div>
          
          {!sections.find(s => s.id === 'price')?.isCollapsed && (
            <div className="section-content">
              <div className="price-inputs">
                <div className="price-input-group">
                  <label>Giá tối thiểu</label>
                  <input 
                    type="number" 
                    placeholder="0"
                    value={filter.minPrice || ''}
                    onChange={e => setFilter(prev => ({...prev, minPrice: Number(e.target.value) || 0}))}
                    className="price-input"
                  />
                </div>
                <div className="price-separator">-</div>
                <div className="price-input-group">
                  <label>Giá tối đa</label>
                  <input 
                    type="number" 
                    placeholder="∞"
                    value={filter.maxPrice || ''}
                    onChange={e => setFilter(prev => ({...prev, maxPrice: Number(e.target.value) || 0}))}
                    className="price-input"
                  />
                </div>
              </div>
              
              {/* Quick Price Ranges */}
              <div className="quick-price-ranges">
                <span className="quick-range-label">Khoảng giá nhanh:</span>
                <div className="price-range-buttons">
                  {[
                    { label: 'Dưới 1tr', min: 0, max: 1000000 },
                    { label: '1tr - 2tr', min: 1000000, max: 2000000 },
                    { label: '2tr - 5tr', min: 2000000, max: 5000000 },
                    { label: 'Trên 5tr', min: 5000000, max: 0 }
                  ].map((range, index) => (
                    <button
                      key={index}
                      className={`price-range-btn ${
                        filter.minPrice === range.min && filter.maxPrice === range.max ? 'active' : ''
                      }`}
                      onClick={() => setFilter(prev => ({
                        ...prev, 
                        minPrice: range.min, 
                        maxPrice: range.max
                      }))}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <div className="filter-actions">
        <button className="apply-filters-btn" onClick={handleFilterClick}>
          <FontAwesomeIcon icon={faCheck} />
          Áp dụng bộ lọc
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;