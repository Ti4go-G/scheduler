const taskModel = require('../models/taskModel');

const createTask = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'Voce precisa estar logado' });
        }

        const { title, description, start, end, status } = req.body;
        const task = await taskModel.create({
            title,
            description,
            start,
            end,
            status,
            user_id: req.user.id,
        });
        return res.status(201).json(task);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Ocorreu um erro ao criar a tarefa' });
    }
};

const getTasks = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'Voce precisa estar logado' });
        }

        const tasks = await taskModel.findAll({ where: { user_id: req.user.id } });
        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Ocorreu um erro ao buscar as tarefas' });
    }
};

const updateTask = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'Voce precisa estar logado' });
        }

        const { id } = req.params;
        const { title, description, start, end, status } = req.body;
        const task = await taskModel.findOne({ where: { id, user_id: req.user.id } });

        if (!task) {
            return res.status(404).json({ message: 'Tarefa nao encontrada' });
        }

        await task.update({ title, description, start, end, status });
        return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Ocorreu um erro ao atualizar a tarefa' });
    }
};

const deleteTask = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: 'Voce precisa estar logado' });
        }

        const { id } = req.params;
        const deletedCount = await taskModel.destroy({ where: { id, user_id: req.user.id } });

        if (!deletedCount) {
            return res.status(404).json({ message: 'Tarefa nao encontrada' });
        }

        return res.status(200).json({ message: 'Tarefa excluida com sucesso' });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ message: 'Ocorreu um erro ao excluir a tarefa' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
};
