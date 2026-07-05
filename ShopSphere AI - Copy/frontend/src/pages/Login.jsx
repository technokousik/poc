import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { setToken, setUser } from '../features/auth/authSlice'
import { loginUser } from '../api/authApi'
import Button from '../components/common/Button'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await loginUser(form)
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      toast.success('Login successful')
      navigate('/products')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card" style={{ maxWidth: '420px', margin: '2rem auto', padding: '1.5rem' }}>
      <h2>Login</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Access your account and unlock the AI-powered storefront.</p>
      <form onSubmit={handleSubmit}>
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" style={{ display: 'block', width: '100%', marginBottom: '0.75rem' }} />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" style={{ display: 'block', width: '100%', marginBottom: '0.75rem' }} />
        <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
      </form>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
        New here? <Link to="/register">Create an account</Link>
      </p>
    </div>
  )
}

export default Login
