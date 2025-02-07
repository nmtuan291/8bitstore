
interface FilterDropdownProps {
    title: string,
    items: string[]
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, items }) => {

    return (
        <div className="dropdown-container">
            <p className="dropdown-title">{title}</p>
            <ul className="dropdown-content">
                { items.map((item: string) => <li>{item}</li>)}
            </ul>
        </div>
    )
};