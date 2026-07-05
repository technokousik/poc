import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilter from '../components/products/ProductFilter'
import Pagination from '../components/products/Pagination'
import { getProducts } from '../api/productApi'
import { setProducts } from '../features/products/productSlice'

const Products = () => {
  const dispatch = useDispatch()
  const [products, setLocalProducts] = useState([])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await getProducts()
        const items = response?.data?.products || []
        setLocalProducts(items)
        dispatch(setProducts(items))
      } catch (error) {
        console.error('Unable to load products', error)
      }
    }

    loadProducts()
  }, [dispatch])

  return (
    <div className="panel">
      <h2>Products</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Search, filter, and discover the best products for your lifestyle.</p>
      <ProductFilter />
      <ProductGrid products={products} />
      <Pagination />
    </div>
  )
}

export default Products
