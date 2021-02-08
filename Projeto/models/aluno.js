const moment = require('moment')
const { listenerCount } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')

class Aluno {
    adiciona(aluno, res) {
        const dt_nasc = moment(aluno.dt_nasc, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const alunoDAO = {...aluno, dt_nasc}

        const nomeValido = aluno.nome.length >= 5

        const validacoes = [
            {
                nome: 'nome',
                valido: nomeValido,
                mensagem: 'O nome deve possuir 5 ou mais caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const exitemErros = erros.length

        if(exitemErros){
            res.status(400).json(erros)
        }
        else{
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

    lista(res) {
        const sql = 'SELECT * from Aluno'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = `SELECT * from Aluno where id = ${id}`

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                if(resultados.length == 0){
                    res.status(404).json('Não encontrado')
                }
                else{
                    res.status(200).json(resultados[0])
                }
                
                
                
            }
        })
    }
}

module.exports = new Aluno