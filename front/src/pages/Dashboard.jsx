import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dash.css'
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../services/api'

function Dashboard() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [tasks, setTasks] = useState([])
  const [dashboardMessage, setDashboardMessage] = useState('')
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    status: 'pendente',
  })

  const token = localStorage.getItem('token')
  const login = localStorage.getItem('login') || 'usuario'

  const authToken = useMemo(() => token, [token])

  const pendingTasks = tasks.filter((task) => task.status === 'pendente')
  const completedTasks = tasks.filter((task) => task.status === 'concluida')
  const canceledTasks = tasks.filter((task) => task.status === 'cancelada')

  const formatDateTime = (dateValue) => {
    const date = new Date(dateValue)
    return date.toLocaleString('pt-BR')
  }

  const toInputDateTime = (dateValue) => {
    const date = new Date(dateValue)
    const timezoneOffset = date.getTimezoneOffset() * 60000
    const localDate = new Date(date.getTime() - timezoneOffset)
    return localDate.toISOString().slice(0, 16)
  }

  const clearTaskForm = () => {
    setTaskForm({
      title: '',
      description: '',
      start: '',
      end: '',
      status: 'pendente',
    })
    setEditingTaskId(null)
  }

  const loadTasks = async () => {
    try {
      const data = await getTasks(authToken)
      setTasks(data)
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('login')
        navigate('/login')
        return
      }
      setDashboardMessage('Nao foi possivel carregar as tarefas.')
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }

    loadTasks()
  }, [token])

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('login')
    navigate('/login')
  }

  const handleTaskInputChange = (event) => {
    const { name, value } = event.target
    setTaskForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTaskSubmit = async (event) => {
    event.preventDefault()
    setDashboardMessage('')

    try {
      const payload = {
        ...taskForm,
        start: new Date(taskForm.start).toISOString(),
        end: new Date(taskForm.end).toISOString(),
      }

      if (editingTaskId) {
        await updateTask(authToken, editingTaskId, payload)
        setDashboardMessage('Tarefa atualizada com sucesso.')
      } else {
        await createTask(authToken, payload)
        setDashboardMessage('Tarefa criada com sucesso.')
      }

      setIsModalOpen(false)
      clearTaskForm()
      loadTasks()
    } catch (error) {
      const apiMessage = error.response?.data?.message
      setDashboardMessage(apiMessage || 'Nao foi possivel salvar a tarefa.')
    }
  }

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(authToken, taskId)
      setDashboardMessage('Tarefa removida com sucesso.')
      loadTasks()
    } catch (error) {
      const apiMessage = error.response?.data?.message
      setDashboardMessage(apiMessage || 'Nao foi possivel remover a tarefa.')
    }
  }

  const handleStatusChange = async (task, status) => {
    if (status === task.status) {
      return
    }

    try {
      await updateTask(authToken, task.id, {
        title: task.title,
        description: task.description,
        start: task.start,
        end: task.end,
        status,
      })
      setDashboardMessage('Status da tarefa atualizado.')
      loadTasks()
    } catch (error) {
      const apiMessage = error.response?.data?.message
      setDashboardMessage(apiMessage || 'Nao foi possivel atualizar a tarefa.')
    }
  }

  const handleEditTask = (task) => {
    setEditingTaskId(task.id)
    setTaskForm({
      title: task.title,
      description: task.description,
      start: toInputDateTime(task.start),
      end: toInputDateTime(task.end),
      status: task.status,
    })
    setIsModalOpen(true)
  }

  const handleOpenCreateModal = () => {
    clearTaskForm()
    setIsModalOpen(true)
  }

  const renderTaskCards = (taskList) => {
    if (!taskList.length) {
      return <p className="empty-message">Nenhuma atividade nesta coluna.</p>
    }

    return taskList.map((task) => (
      <article key={task.id} className="task-card">
        <h3>{task.title}</h3>
        <p className="task-description">{task.description}</p>
        <p>
          <strong>Inicio:</strong> {formatDateTime(task.start)}
        </p>
        <p>
          <strong>Termino:</strong> {formatDateTime(task.end)}
        </p>
        <div className="task-actions">
          <select value={task.status} onChange={(event) => handleStatusChange(task, event.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluida</option>
            <option value="cancelada">Cancelada</option>
          </select>
          <button type="button" onClick={() => handleEditTask(task)}>
            Editar
          </button>
          <button type="button" className="danger" onClick={() => handleDeleteTask(task.id)}>
            Excluir
          </button>
        </div>
      </article>
    ))
  }

  return (
    <>
      <header>
        <nav className="menu" id="menu-logado">
          <p id="welcome-text">Bem-vindo, {login}!</p>
          <a href="#" id="logout-btn" onClick={handleLogout}>
            Sair
          </a>
        </nav>
      </header>

      <main className="sec-container dashboard-page">
        <div className="dashboard-toolbar">
          <h1>Minhas atividades</h1>
          <button type="button" id="new-task-btn" onClick={handleOpenCreateModal}>
            + Nova atividade
          </button>
        </div>

        <p id="dashboard-message" aria-live="polite">
          {dashboardMessage}
        </p>

        <section className="wrapper" id="pendentes">
          <h2 className="pend">Atividades pendentes</h2>
          <div className="grid" id="pending-grid">{renderTaskCards(pendingTasks)}</div>
        </section>

        <section className="wrapper" id="andamento">
          <h2 className="and">Atividades concluidas</h2>
          <div className="grid" id="completed-grid">{renderTaskCards(completedTasks)}</div>
        </section>

        <section className="wrapper" id="concluidas">
          <h2 className="concl">Atividades canceladas</h2>
          <div className="grid" id="canceled-grid">{renderTaskCards(canceledTasks)}</div>
        </section>
      </main>

      <div className={`modal-overlay ${isModalOpen ? '' : 'hidden'}`} id="task-modal-overlay">
        <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
          <h2 id="task-modal-title">{editingTaskId ? 'Editar atividade' : 'Nova atividade'}</h2>
          <form id="task-form" onSubmit={handleTaskSubmit}>
            <input type="hidden" id="task-id" name="taskId" />

            <label htmlFor="task-title">Titulo</label>
            <input
              type="text"
              id="task-title"
              name="title"
              value={taskForm.title}
              onChange={handleTaskInputChange}
              required
            />

            <label htmlFor="task-description">Descricao</label>
            <textarea
              id="task-description"
              name="description"
              rows="3"
              value={taskForm.description}
              onChange={handleTaskInputChange}
              required
            ></textarea>

            <label htmlFor="task-start">Inicio</label>
            <input
              type="datetime-local"
              id="task-start"
              name="start"
              value={taskForm.start}
              onChange={handleTaskInputChange}
              required
            />

            <label htmlFor="task-end">Termino</label>
            <input
              type="datetime-local"
              id="task-end"
              name="end"
              value={taskForm.end}
              onChange={handleTaskInputChange}
              required
            />

            <label htmlFor="task-status">Status</label>
            <select
              id="task-status"
              name="status"
              value={taskForm.status}
              onChange={handleTaskInputChange}
            >
              <option value="pendente">Pendente</option>
              <option value="concluida">Concluida</option>
              <option value="cancelada">Cancelada</option>
            </select>

            <div className="modal-actions">
              <button type="submit" id="task-submit-btn">
                {editingTaskId ? 'Salvar alteracoes' : 'Salvar'}
              </button>
              <button
                type="button"
                id="task-cancel-btn"
                className="btn-cancel"
                onClick={() => {
                  setIsModalOpen(false)
                  clearTaskForm()
                }}
              >
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
