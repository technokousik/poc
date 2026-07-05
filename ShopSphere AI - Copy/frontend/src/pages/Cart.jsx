import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartItem from '../components/cart/CartItem'
import OrderSummary from '../components/cart/OrderSummary'
import { getCart } from '../api/cartApi'
import { setCartItems } from '../features/cart/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.cart.items)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const loadCart = async () => {
      try {
        const response = await getCart()
        const cartItems = response?.data?.cart?.items || []
        dispatch(setCartItems(cartItems))
      } catch (error) {
        console.error('Unable to load cart', error)
      }
    }

    loadCart()
  }, [dispatch])

  return (
    <div className="grid-2">
      <div className="panel">
        <h2>Your cart</h2>
        {items.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Your cart is empty. Add a few products from the catalog to start.</p>
        ) : (
          items.map((item) => <CartItem key={item.product?._id || item.id} name={item.product?.name || item.name} quantity={item.quantity} />)
        )}
      </div>
      <div className="panel">
        <OrderSummary total={subtotal} />
        <Link to="/checkout" className="btn btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart
