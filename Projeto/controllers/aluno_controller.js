const { criarAtendimentos } = require('../infraestrutura/tabelas')
const Aluno = require('../models/aluno')

module.exports = app => {
    app.get('/aluno', (req, res) => {
        Aluno.lista(res)
    })

    app.get('/aluno/:id', (req, res) => {
        const id = parseInt(req.params['id'])
        Aluno.buscaPorId(id, res)
    })

    app.post('/aluno', (req, res) => {
        const aluno = req.body

        Aluno.adiciona(aluno, res)
    })

    app.patch('/aluno/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Aluno.altera(id, valores, res)
    })

    app.delete('/aluno/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Aluno.apaga(id, res)
    })
}