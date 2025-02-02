import ProductItem from "../ProductItem/ProductItem"

const ProductSection = ({ sectionName, products }) => {
    
    return (
        <div>
            <h3>{sectionName}</h3>
            {
                products.map(product => <ProductItem product={product}/>)
            }
        </div>
    )
}

export default ProductSection;