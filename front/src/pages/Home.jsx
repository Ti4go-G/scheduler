function Home() {
  return (
    <>
      <main id="home">
        <section className="cta">
          <span className="hero-tag">Bem-vindo</span>
          <h1 className="hero-title">Organize suas tarefas com praticidade</h1>
          <p id="text" className="hero-description">
            Registre-se ou faca login para criar listas, acompanhar o progresso e
            manter sua rotina sob controle.
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
    </>
  )
}

export default Home