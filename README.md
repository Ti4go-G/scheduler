# Como Rodar o Projeto

## Pré-requisitos
- Node.js v22 ou superior
- MySQL 8.x
- npm

## 1. Configuração do Backend

### 1.1 Criar e configurar variáveis de ambiente
```bash
cd back
cp .env
```

Editar `back/.env` e adicionar as credenciais do MySQL:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha_do_mysql
DB_NAME=scheduler
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
```

### 1.2 Instalar dependências
```bash
npm install
```

### 1.3 Criar banco de dados
```bash
npm run db:create
```

### 1.4 Executar migrations
```bash
npx sequelize db:migrate
```

### 1.5 Rodar o backend
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

---

## 2. Configuração do Frontend

### 2.1 Instalar dependências
```bash
cd front
npm install
```

### 2.2 (Opcional) Configurar variável de ambiente
Criar `front/.env` se precisar de uma URL diferente:
```
VITE_API_URL=http://localhost:3000
```

**Padrão:** `http://localhost:3000` (não precisa criar .env se usar a porta padrão)

### 2.3 Rodar em desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## 3. Fluxo Completo de Teste

### Terminal 1: Backend
```bash
cd back
npm run dev
```

### Terminal 2: Frontend
```bash
cd front
npm run dev
```

### Browser
Abrir `http://localhost:5173` e:
1. **Registrar novo usuário** com login e senha
2. **Fazer login** com as credenciais
3. **Criar Tasks** com título, descrição e data
4. **Alternar status** das tasks (pendente → concluída → cancelada)
5. **Ver calendário** clicando no botão "Visualizar Calendário"

---

## 4. Build para Produção

### Frontend
```bash
cd front
npm run build
```

Saída em `front/dist/`

### Verificar Lint
```bash
npm run lint
```

---

## 5. Troubleshooting

### Erro: "ER_ACCESS_DENIED_FOR_USER"
- Verificar credenciais MySQL em `.env`
- Criar usuário MySQL se não existir

### Erro: "Impossible to generate a valid unseeded highlander for dialect mysql"
- Executar `npm run db:create` novamente
- Verificar se MySQL está rodando

### Frontend não conecta ao backend
- Verificar se backend está rodando em `:3000`
- Verificar CORS em `back/src/app.js`
- Conferir `VITE_API_URL` em `front/.env`

---

## 6. Arquitetura

```
scheduler/
├── back/                 
│   ├── src/
│   │   ├── controllers/  # Lógica de negócio
│   │   ├── models/       # Modelos Sequelize
│   │   ├── routes/       # Rotas Express
│   │   ├── middlewares/  # Autenticação JWT
│   │   ├── database/     # Conexão DB
│   │   └── app.js        # Configuração Express
│   └── .env              # Variáveis de ambiente
│
└── front/                
    ├── src/
    │   ├── pages/        # Componentes de página
    │   ├── services/     # Chamadas de API
    │   └── App.jsx       # Componente raiz
    └── .env              # (Opcional) Variáveis de ambiente
```

---

## 7. APIs Disponíveis

### Autenticação
- `POST /users/register` - Registrar novo usuário
- `POST /users/login` - Fazer login

### Tasks (requer autenticação)
- `GET /tasks` - Listar tasks do usuário
- `POST /tasks` - Criar nova task
- `PUT /tasks/:id` - Atualizar task
- `DELETE /tasks/:id` - Deletar task

**Headers obrigatório:** `Authorization: Bearer {token}`
