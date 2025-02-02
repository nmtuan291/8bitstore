

const FilterDropdown = ({ contents }) => {

    return (
        <div className="dropdown-container">
            <p className="dropdown-title">{contents.title}</p>
            <ul className="dropdown-content">
                { contents.map(content => <li>{content.item}</li>)}
            </ul>
        </div>
    )
};