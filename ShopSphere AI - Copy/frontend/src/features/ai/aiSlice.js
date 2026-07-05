import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  recommendations: [],
  supportReply: null,
  loading: false,
  error: null,
}

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    setRecommendations: (state, action) => {
      state.recommendations = action.payload
    },
    setSupportReply: (state, action) => {
      state.supportReply = action.payload
    },
  },
})

export const { setRecommendations, setSupportReply } = aiSlice.actions
export default aiSlice.reducer
