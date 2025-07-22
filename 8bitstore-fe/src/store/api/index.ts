import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CartItem, User, Product, WishlistItem, OrderData, Review } from "../../interfaces/interfaces";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        baseUrl: "https://localhost:7213", 
        credentials: 'include'
    }),
    tagTypes: ["User", "Cart", "Wishlist", "Product", "Order", "Review"],
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
        // Cart
        getCart: builder.query<CartItem[], void>({
            query: () => "/api/Cart",
            transformResponse: (response: any) => response.cartItems ?? [],
            providesTags: ["Cart"]
        }),
        addCart: builder.mutation<void, { productId: string, quantity: number }>({
            query: body => ({
                url: "/api/Cart/add",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cart"]
        }),
        updateCart: builder.mutation<void, { productId: string, quantity: number }>({
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
        // Orders
        getOrders: builder.query<OrderData[], void>({
            query: () => "/api/Order",
            providesTags: ["Order"]
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
        })
    })
})

export const {
    useGetCurrentUserQuery,
    useLoginMutation,
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
    useAddReviewMutation
} = apiSlice;