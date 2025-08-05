import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSort } from "@fortawesome/free-solid-svg-icons";
import "./ProductSort.scss";

interface ProductSortProps {
    filterString: string,
    onFilterClick: (filter: string) => void
}

const ProductSort: React.FC<ProductSortProps> = ({ filterString, onFilterClick }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const sortOptions = [
        { value: "Phổ biến", label: "Phổ biến" },
        { value: "Giá thấp đến cao", label: "Giá thấp đến cao" },
        { value: "Giá cao đến thấp", label: "Giá cao đến thấp" },
        { value: "Mới nhất", label: "Mới nhất" },
        { value: "Đánh giá cao", label: "Đánh giá cao" }
    ];

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: string) => {
        onFilterClick(option);
        setIsOpen(false);
    };

    return (
        <div className="product-sort-container" ref={dropdownRef}>
            <div className="sort-dropdown">
                <button 
                    className={`sort-button ${isOpen ? 'active' : ''}`}
                    onClick={handleToggle}
                    type="button"
                >
                    <FontAwesomeIcon icon={faSort} className="sort-icon" />
                    <span className="sort-label">{filterString}</span>
                    <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className={`chevron-icon ${isOpen ? 'rotated' : ''}`} 
                    />
                </button>
                
                <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
                    {sortOptions.map((option, index) => (
                        <button
                            key={index}
                            className={`dropdown-item ${filterString === option.value ? 'active' : ''}`}
                            onClick={() => handleOptionClick(option.value)}
                            type="button"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductSort;