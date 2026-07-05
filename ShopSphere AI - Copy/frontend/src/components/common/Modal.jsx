const Modal = ({ title, children, open }) => {
  if (!open) return null

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center' }}>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.75rem', minWidth: '280px' }}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export default Modal
