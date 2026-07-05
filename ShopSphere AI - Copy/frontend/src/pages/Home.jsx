import { Link } from 'react-router-dom'
import { FiZap, FiShield, FiCpu } from 'react-icons/fi'
import ShoppingRecommendation from '../components/ai/ShoppingRecommendation'
import ProductGrid from '../components/products/ProductGrid'

const featuredProducts = [
  { id: 1, name: 'Lenovo LOQ', price: 58999, badge: 'Best for creators' },
  { id: 2, name: 'Sony WH-1000XM5', price: 29999, badge: 'AI audio pick' },
  { id: 3, name: 'iPad Air', price: 54999, badge: 'Fast & lightweight' },
]

const Home = () => (
  <div>
    <section className="hero-card">
      <div>
        <span className="badge"><FiZap /> AI commerce platform</span>
        <h1 className="hero-title">Shop smarter with an AI-powered storefront.</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '620px' }}>
          Discover products, compare options, optimize your cart, and get instant support from intelligent agents built for modern ecommerce.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="btn btn-primary">Explore Products</Link>
          <Link to="/login" className="btn btn-secondary">Start Shopping</Link>
        </div>
      </div>
      <div className="panel">
        <h3>Why buyers love ShopSphere AI</h3>
        <ul style={{ paddingLeft: '1rem', color: 'var(--text-muted)' }}>
          <li><FiCpu /> Personalized product recommendations</li>
          <li><FiShield /> Secure auth and order flow</li>
          <li><FiZap /> Instant AI support and compare tools</li>
        </ul>
      </div>
    </section>

    <section className="panel" style={{ marginBottom: '1rem' }}>
      <h3>Featured AI picks</h3>
      <ProductGrid products={featuredProducts} />
    </section>

    <ShoppingRecommendation />
  </div>
)

export default Home
