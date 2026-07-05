import { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <div className={`app-shell ${darkMode ? 'dark' : 'light'}`}>
      <Navbar />
      <main className="app-main">
        <AppRoutes />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  )
}

export default App
