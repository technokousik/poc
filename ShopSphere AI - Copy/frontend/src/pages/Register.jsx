import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { registerUser } from '../api/authApi'
import Button from '../components/common/Button'

const Register = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await registerUser(form)
      toast.success('Registration successful. Please log in.')
      navigate('/login')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-card" style={{ maxWidth: '420px', margin: '2rem auto', padding: '1.5rem' }}>
      <h2>Create account</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Join ShopSphere AI to access smart recommendations and AI support.</p>
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" style={{ display: 'block', width: '100%', marginBottom: '0.75rem' }} />
        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" style={{ display: 'block', width: '100%', marginBottom: '0.75rem' }} />
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" style={{ display: 'block', width: '100%', marginBottom: '0.75rem' }} />
        <Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</Button>
      </form>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}

export default Register
