
export interface User {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
    address: string,
    phoneNumber: string,
    fullName: string,
}


export interface Product {
    productId: string
    productName: string,
    price: number,
    manufacturer: string
    imgUrl: string[],
    type: string,
    description: string,
    platform: string[],
    stockNum: number,
    genre: string[]
}

export interface CartItem {
    productId: string;
    productName: string,
    price: number,
    quantity: number,
    imgUrl: string[]
}
