import ProductSection from "./ProductSection";


const products = [
    {
        name: "playstation 2",
        price: 30000
    },
    {
        name: "playstation 3",
        price: 30000
    }
];

const ProductSectionTest = () => {

    return <ProductSection products={products} sectionName="playstation"/>
};

export default ProductSectionTest;