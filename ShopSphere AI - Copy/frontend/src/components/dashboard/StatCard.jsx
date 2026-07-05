const StatCard = ({ title, value }) => (
  <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.75rem' }}>
    <h4>{title}</h4>
    <p>{value}</p>
  </div>
)

export default StatCard
