import './Forms.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/api'

function AuthForm({ mode }) {
  const navigate = useNavigate()
  const isRegister = mode === 'register'
  const title = isRegister ? 'Registre-se' : 'Login'
  const formId = isRegister ? 'register-form' : 'login-form'
  const buttonText = isRegister ? 'Cadastrar' : 'Entrar'
  const loginPlaceholder = isRegister ? 'Login' : 'Seu login'
  const [formData, setFormData] = useState({ login: '', password: '' })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setMessage('')
    setIsLoading(true)

    try {
      if (isRegister) {
        await registerUser(formData)
        setMessage('Cadastro realizado com sucesso. Faça login.')
        setTimeout(() => navigate('/login'), 700)
      } else {
        const data = await loginUser(formData)
        localStorage.setItem('token', data.token)
        localStorage.setItem('login', formData.login)
        navigate('/dashboard')
      }
    } catch (error) {
      const apiMessage = error.response?.data?.message
      setMessage(apiMessage || 'Nao foi possivel concluir a operacao.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page" id={mode}>
      <section className="form-container">
        <h1>{title}</h1>

        <form id={formId} method="post" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login">
              <span className="material-symbols-outlined">mail</span>
            </label>
            <input
              type="text"
              id="login"
              name="login"
              placeholder={loginPlaceholder}
              value={formData.login}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password">
              <span className="material-symbols-outlined">key</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              minLength={isRegister ? 8 : undefined}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Enviando...' : buttonText}
          </button>
        </form>

        <p id="form-message" aria-live="polite">
          {message}
        </p>
      </section>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#0099ff"
          fillOpacity="1"
          d="M0,256L48,218.7C96,181,192,107,288,101.3C384,96,480,160,576,192C672,224,768,224,864,197.3C960,171,1056,117,1152,112C1248,107,1344,149,1392,170.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </main>
  )
}

export default AuthForm
