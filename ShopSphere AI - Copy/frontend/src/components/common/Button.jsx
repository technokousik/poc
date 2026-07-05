const Button = ({ children, ...props }) => (
  <button
    style={{
      padding: '0.6rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      background: '#2563eb',
      color: 'white',
      cursor: 'pointer',
    }}
    {...props}
  >
    {children}
  </button>
)

export default Button
