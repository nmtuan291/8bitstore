
export interface User {
    _id: string,
    password: string,
    confirmPassword: string,
    address: string,
    phoneNumber: string,
    fullName: string,
}


export interface Product {
    _id: string
    productName: string,
    price: number,
    manufacturer: string
    sales: number,
    imgUrl: string,
    type: string,
    description: string,
    platform: string[],
    stockNum: number,
    genre: string[]
}

export interface CartItem {
    _id: string;
    productName: string,
    productPrice: number,
    amoung: number,
    imgUrl: string
}
