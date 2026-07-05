import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stats: [],
  loading: false,
  error: null,
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDashboardData: (state, action) => {
      state.stats = action.payload
    },
  },
})

export const { setDashboardData } = dashboardSlice.actions
export default dashboardSlice.reducer
