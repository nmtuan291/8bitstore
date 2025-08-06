import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem, User, Product, WishlistItem, OrderData, Review } from "../../interfaces/interfaces";
import { Address } from "../../interfaces/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include'
    }),
    tagTypes: ["User", "Cart", "Wishlist", "Product", "Order", "Review", "Address"],
    endpoints: builder => ({
        // User
        getCurrentUser: builder.query<User, void>({
            query: () => "api/User/get-user",
            providesTags: ["User"]
        }),
        login: builder.mutation<User, { userName: string, password: string }>({
            query: (body) => ({
                url: "/api/User/login",
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),
        signUp: builder.mutation<void, {
            userName: string,
            Email: string,
            fullName: string,
            password: string,
            confirmPassword: string,
            phoneNumber: string
        }>({
            query: body => ({
                url: "/api/User/signup",
                method: "POST",
                body
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "api/User/logout",
                method: "POST"
            })
        }),
        // Cart
        getCart: builder.query<CartItem[], void>({
            query: () => "/api/Cart",
            transformResponse: (response: any) => response.cartItems ?? [],
            providesTags: ["Cart"]
        }),
        addCart: builder.mutation<void, CartItem>({
            query: body => ({
                url: "/api/Cart/add",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cart"]
        }),
        updateCart: builder.mutation<void, CartItem>({
            query: body => ({
                url: "/api/Cart/add",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cart"]
        }),
        deleteCartItem: builder.mutation<void, { productId: string }>({
            query: ({ productId }) => ({
                url: `/api/Cart/delete?productId=${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"]
        }),
        // Wishlist
        getWishlist: builder.query<WishlistItem[], void>({
            query: () => "/api/Wishlist",
            transformResponse: (response: any) => response.wishlistItems ?? [],
            providesTags: ["Wishlist"]
        }),
        addWishlist: builder.mutation<void, { productId: string }>({
            query: ({ productId }) => ({
                url: "/api/Wishlist/add",
                method: "POST",
                body: JSON.stringify(productId),
                headers: { "Content-Type": "application/json" }
            }),
            invalidatesTags: ["Wishlist"]
        }),
        removeWishlist: builder.mutation<void, { productId: string }>({
            query: ({ productId }) => ({
                url: `/api/Wishlist/delete?productId=${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Wishlist"]
        }),
        // Products
        getProducts: builder.query<{ products: Product[], totalPages: number, pageSize: number }, { page: number, params: string }>({
            query: ({ page, params }) => `/api/Product/get-products?page=${page}&${params}`,
            providesTags: ["Product"]
        }),
        getProduct: builder.query<Product, string>({
            query: (productId) => `/api/Product/get-product?ProductId=${productId}`,
            providesTags: ["Product"]
        }),
        getAllProducts: builder.query<Product[], void>({
            query: () => "/api/Product/get-all",
        }),
        // Orders
        getOrders: builder.query<{ message: OrderData[] }, void>({
            query: () => "/api/Order",
            providesTags: ["Order"]
        }),
        cancelOrder: builder.mutation<void, string>({
            query: orderId => ({
                url: `/api/Order/change-status/${orderId}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify("cancelled")
            }),
            invalidatesTags: ["Order"]
        }),
        // Reviews
        getReviews: builder.query<Review[], string>({
            query: (productId) => `/api/Review?ProductId=${productId}`,
            providesTags: ["Review"]
        }),
        addReview: builder.mutation<void, { productId: string, comment: string, score: number }>({
            query: (body) => ({
                url: "/api/Review/add",
                method: "POST",
                body
            }),
            invalidatesTags: ["Review"]
        }),
        // Payment
        createPaymentUrl: builder.mutation<{ result: string }, { amount: string }>({
            query: body => ({
                url: "api/Payment/create-url",
                method: "POST",
                body
            })
        }),
        // Address
        getProvinces: builder.query({
            query: () => "https://provinces.open-api.vn/api/?depth=3"
        }),
        addAddress: builder.mutation({
            query: body => ({
                url: "/api/user/address/add",
                method: "POST",
                body
            }),
            invalidatesTags: ["Address"]
        }),
        getAddress: builder.query<Address[], void>({
            query: () => "/api/user/address",
            providesTags: ["Address"]
        }),
        deleteAddress: builder.mutation<void, string>({
            query: addressId => ({
                url: `/api/user/address/delete/${addressId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Address"]
        }),
        updateAddress: builder.mutation({
            query: body => ({
                url: "/api/user/address/update",
                method: "PUT",
                body
            }),
            invalidatesTags: ["Address"]
        })
    })
})

export const {
    useGetCurrentUserQuery,
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation,
    useGetCartQuery,
    useAddCartMutation,
    useUpdateCartMutation,
    useDeleteCartItemMutation,
    useGetWishlistQuery,
    useAddWishlistMutation,
    useRemoveWishlistMutation,
    useGetProductsQuery,
    useGetProductQuery,
    useGetOrdersQuery,
    useGetReviewsQuery,
    useAddReviewMutation,
    useCreatePaymentUrlMutation,
    useGetAddressQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useGetAllProductsQuery,
    useCancelOrderMutation
} = apiSlice;