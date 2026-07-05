const CartItem = ({ name, quantity }) => (
  <div style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}>
    <strong>{name}</strong>
    <p>Qty: {quantity}</p>
  </div>
)

export default CartItem
