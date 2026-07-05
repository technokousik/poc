import ProductCard from './ProductCard'

const ProductGrid = ({ products }) => (
  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
    {products.map((product) => (
      <ProductCard key={product.id} name={product.name} price={product.price} />
    ))}
  </div>
)

export default ProductGrid
