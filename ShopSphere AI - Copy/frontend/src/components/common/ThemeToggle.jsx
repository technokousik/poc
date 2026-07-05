import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../features/theme/themeSlice'

const ThemeToggle = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <button onClick={() => dispatch(toggleTheme())}>
      {darkMode ? '🌙' : '☀️'}
    </button>
  )
}

export default ThemeToggle
