import { useState } from 'react'
import './Dash.css'

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <header>
        <nav className="menu" id="menu-logado">
          <p id="welcome-text">Bem-vindo!</p>
          <a href="#" id="logout-btn">
            Sair
          </a>
        </nav>
      </header>

      <main className="sec-container dashboard-page">
        <div className="dashboard-toolbar">
          <h1>Minhas atividades</h1>
          <button type="button" id="new-task-btn" onClick={() => setIsModalOpen(true)}>
            + Nova atividade
          </button>
        </div>

        <p id="dashboard-message" aria-live="polite"></p>

        <section className="wrapper" id="pendentes">
          <h2 className="pend">Atividades pendentes</h2>
          <div className="grid" id="pending-grid">
            <p className="empty-message">Nenhuma atividade pendente.</p>
          </div>
        </section>

        <section className="wrapper" id="andamento">
          <h2 className="and">Atividades em andamento</h2>
          <div className="grid" id="progress-grid">
            <p className="empty-message">Nenhuma atividade em andamento.</p>
          </div>
        </section>

        <section className="wrapper" id="concluidas">
          <h2 className="concl">Atividades concluidas</h2>
          <div className="grid" id="completed-grid">
            <p className="empty-message">Nenhuma atividade concluida.</p>
          </div>
        </section>
      </main>

      <div className={`modal-overlay ${isModalOpen ? '' : 'hidden'}`} id="task-modal-overlay">
        <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
          <h2 id="task-modal-title">Nova atividade</h2>
          <form id="task-form">
            <input type="hidden" id="task-id" name="taskId" />

            <label htmlFor="task-title">Titulo</label>
            <input type="text" id="task-title" name="title" required />

            <label htmlFor="task-description">Descricao</label>
            <textarea id="task-description" name="description" rows="3" required></textarea>

            <label htmlFor="task-start">Inicio</label>
            <input type="datetime-local" id="task-start" name="start" required />

            <label htmlFor="task-end">Termino</label>
            <input type="datetime-local" id="task-end" name="end" required />

            <label htmlFor="task-status">Status</label>
            <select id="task-status" name="status">
              <option value="pending">Pendente</option>
              <option value="in-progress">Em andamento</option>
              <option value="completed">Concluida</option>
            </select>

            <div className="modal-actions">
              <button type="submit" id="task-submit-btn">
                Salvar
              </button>
              <button type="button" id="task-cancel-btn" className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Dashboard
