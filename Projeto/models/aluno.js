const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Aluno {
    adiciona(aluno, res) {
        const dt_nasc = moment(aluno.dt_nasc, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const alunoDAO = {...aluno, dt_nasc}

        const sql = 'INSERT INTO Aluno SET ?'

        conexao.query(sql, alunoDAO, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(201).json(resultados)
            }
        })
    }
}

module.exports = new Aluno