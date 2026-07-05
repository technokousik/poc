import api from './axios'

export const getRecommendations = (payload) => api.post('/ai/recommendations', payload)
export const getSupportReply = (payload) => api.post('/ai/support', payload)
