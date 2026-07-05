import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FiShoppingBag, FiLayout, FiUser, FiShoppingCart } from 'react-icons/fi'
import ThemeToggle from '../common/ThemeToggle'

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const cartCount = useSelector((state) => state.cart.items.length)

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid rgba(148,163,184,0.24)', background: 'rgba(255,255,255,0.72)', backdropFilter: 'blur(12px)' }}>
      <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.1rem' }}>
        <FiShoppingBag /> <strong>ShopSphere AI</strong>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/cart" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <FiShoppingCart /> {cartCount}
        </Link>
        <Link to={token ? '/orders' : '/login'} className="nav-link">
          {token ? <FiUser /> : 'Login'}
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar
