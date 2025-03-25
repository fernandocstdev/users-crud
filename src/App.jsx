import { useState } from 'react'
import './App.css'
import { usuarios } from './constants/user'
import { useAuth } from './hooks/useAuth'
import { useDarkMode } from './hooks/useDarkMode'
import { Index } from './pages/index'
import { Login } from './pages/login'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { darkMode, toggleDarkMode } = useDarkMode()
  const { user, setUser } = useAuth()

  const handleLogin = (e) => {
    e.preventDefault()

    if (email == '' && password == '') {
      setError('Todos los campos son obligatorios')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Correo electrónico no válido')
      return
    }

    const foundUser = usuarios.find(
      (u) => u.email === email && u.password === password
    )

    if (foundUser) {
      setUser(foundUser)
      const expirationTime = new Date().getTime() + 10 * 60 * 1000
      localStorage.setItem('user', JSON.stringify(foundUser))
      localStorage.setItem('expiration', expirationTime)
      setError('')
    } else {
      setError('Credenciales incorrectas')
      setUser(null)
    }
  }

  const handleLogout = () => {
    setEmail('')
    setPassword('')
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('expiration')
  }

  return (
    <>
      <div className="">
        {user ? (
          <Index
            user={user}
            handleLogout={handleLogout}
            toggleDarkMode={toggleDarkMode}
            darkMode={darkMode}
          />
        ) : (
          <Login
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            handleLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
          />
        )}
      </div>
    </>
  )
}

export default App
