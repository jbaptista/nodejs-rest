const Aluno = require('../models/aluno')

module.exports = app => {
    app.get('/aluno', (req, res) => res.send('CRUD de alunos'))

    app.post('/aluno', (req, res) => {
        const aluno = req.body

        Aluno.adiciona(aluno, res)
    })
}