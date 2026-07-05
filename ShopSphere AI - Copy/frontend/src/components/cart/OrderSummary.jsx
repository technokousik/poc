const OrderSummary = ({ total }) => (
  <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
    <h4>Order Summary</h4>
    <p>Total: ${total}</p>
  </div>
)

export default OrderSummary
