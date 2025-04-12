import { useState, useEffect, useRef } from "react";

interface ProducFilterProps {
    filterString: string,
    onFilterClick: (filter: string) => void
}

const ProductSort: React.FC<ProducFilterProps> = ({ filterString, onFilterClick }) => {
    const [ filterClick, setFilterClick ] = useState<boolean>(false);
    const filterRef = useRef<HTMLDivElement>(null);

    const filters: string[] = ["Phổ biến", "Giá thấp đến cao", "Giá cao đến thấp"];

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (filterRef && !filterRef.current?.contains(event.target as Node)) {
                setFilterClick(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick)

        return () => document.removeEventListener("mousedown", handleOutsideClick);
    })

    const handleDropdownClick = () => {
        setFilterClick(!filterClick);
    }

    return (
        <div className="filter-list-container" ref={filterRef}>
            <p onClick={handleDropdownClick}>{filterString}</p>
            <ul className={`filter-list ${!filterClick ? "hide" : ""}`}>
                {
                    filters.map((filter: string, index: number) => {
                        return (
                            <li 
                                key={index}
                                onClick={() => {
                                    onFilterClick(filter)
                                    setFilterClick(false)
                                }}
                            >
                                {filter}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default ProductSort;