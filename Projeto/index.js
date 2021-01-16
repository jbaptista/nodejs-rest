const express = require('express')

const app = express()

app.listen(3000, () => console.log('servidor rodando na porta 3000'))

app.get('/turma', (req, res) => res.send('CRUD de turmas'))

app.get('/aluno', (req, res) => res.send('CRUD de alunos'))