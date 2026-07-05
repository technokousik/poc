import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import productReducer from '../features/products/productSlice'
import cartReducer from '../features/cart/cartSlice'
import orderReducer from '../features/orders/orderSlice'
import dashboardReducer from '../features/dashboard/dashboardSlice'
import aiReducer from '../features/ai/aiSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    dashboard: dashboardReducer,
    ai: aiReducer,
    theme: themeReducer,
  },
})

export default store
