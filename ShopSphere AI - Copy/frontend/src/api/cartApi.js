import api from './axios'

export const getCart = () => api.get('/cart')
export const addToCart = (payload) => api.post('/cart', payload)
export const updateCartItem = (id, payload) => api.put(`/cart/${id}`, payload)
export const removeCartItem = (id) => api.delete(`/cart/${id}`)
