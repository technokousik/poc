import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { setCartItems, clearCart } = cartSlice.actions
export default cartSlice.reducer
