import './Forms.css'

function AuthForm({ mode }) {
  const isRegister = mode === 'register'
  const title = isRegister ? 'Registre-se' : 'Login'
  const formId = isRegister ? 'register-form' : 'login-form'
  const buttonText = isRegister ? 'Cadastrar' : 'Entrar'
  const emailPlaceholder = isRegister ? 'Email' : 'Email cadastrado'

  return (
    <main className="auth-page" id={mode}>
      <section className="form-container">
        <h1>{title}</h1>

        <form id={formId} method="post">
          <div>
            <label htmlFor="email">
              <span className="material-symbols-outlined">mail</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={emailPlaceholder}
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
              required
            />
          </div>

          <button type="submit">{buttonText}</button>
        </form>

        <p id="form-message" aria-live="polite"></p>
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
