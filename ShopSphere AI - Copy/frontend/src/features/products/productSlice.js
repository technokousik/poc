import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
  },
})

export const { setProducts, setSelectedProduct } = productSlice.actions
export default productSlice.reducer
