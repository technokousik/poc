const ProductCard = ({ name, price }) => (
  <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
    <h4>{name}</h4>
    <p>${price}</p>
  </div>
)

export default ProductCard
