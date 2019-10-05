const moment = require('moment')

module.exports = app => {
    // por padarão recebe parametro 
    //date se não vier assumi data atual
    //recupera user de paload
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate()

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=',date)
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))
            .catch(err => res.status(500).json(err))
    }
    //sava tarefa task
    const save = (req, res) => {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Informe uma tarefa ;-[')
        }
        req.body.userId = req.user.id
        // para salvar data correta -> req.body.date -1
        req.body.date -1
        
        app.db('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }
  //remove user
  const remove = (req, res) => {
    app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .del()
        .then(rowsDeleted => {
            if (rowsDeleted > 0) {
                res.status(204).send()
            } else {
                const msg = `Não foi encontrada task com id ${req.params.id}.`
                res.status(400).send(msg)
            }
        })
        .catch(err => res.status(400).json(err))
}
   //updateTaskDoneAt altera status 
   //de tarefa como concluido ou não
   const updateTaskDoneAt = (req, res, doneAt) => {
    app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .update({ doneAt })
        .then(_ => res.status(204).send())
        .catch(err => res.status(400).json(err))
}

   // toggleTask ou alternacia usa updateTaskDoneAt
   // para anterna a condição da tarefa
   const toggleTask = (req, res) => {
    app.db('tasks')
        .where({ id: req.params.id, userId: req.user.id })
        .first()
        .then(task => {
            if (!task) {
                const msg = `Task com id ${req.params.id} não encontrada.`
                return res.status(400).send(msg)
            }

            const doneAt = task.doneAt ? null : new Date()
            updateTaskDoneAt(req, res, doneAt)
        })
        .catch(err => res.status(400).json(err))
}

return { getTasks, save, remove, toggleTask }
}