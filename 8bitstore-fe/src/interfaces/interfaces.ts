
export interface IUserInfo {
    email: string,
    password: string,
    confirmPassword: string,
    address: string,
    phoneNumber: string,
    fullName: string,
}


export interface IProduct {
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
