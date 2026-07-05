import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.error = null
    },
  },
})

export const { setUser, setToken, clearAuth } = authSlice.actions
export default authSlice.reducer
