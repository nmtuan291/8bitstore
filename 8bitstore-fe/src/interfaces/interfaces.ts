
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


export interface OrderItem {
    productId: string
    imgUrl: string[],
    productName: string,
    price: number,
    quantity: number,
    total: number,
}

export interface Review {
    productId: string,
    userName: string,
    score: number,
    comment: string,
    reviewDate: string
}
