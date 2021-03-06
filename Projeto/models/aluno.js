const moment = require('moment')
const { listenerCount } = require('../infraestrutura/conexao')
const conexao = require('../infraestrutura/conexao')
const uploadDeArquivo = require('../arquivos/uploadDeArquivos')

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

            uploadDeArquivo(alunoDAO.foto, alunoDAO.nome, (erro, caminhoDestino) => {
                if(erro){
                    res.status(400).json({ erro })
                }else{
                    const novoAluno = {...alunoDAO, foto: caminhoDestino}
                
                    conexao.query(sql, novoAluno, (erro, resultados) => {
                        if(erro){
                            res.status(400).json(erro)
                        }
                        else{
                            res.status(201).json(novoAluno)
                        }
                    })
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

    altera(id, valores, res) {
        const sql = 'UPDATE Aluno SET ? WHERE id = ?'

        
        if(valores.dt_nasc){
            const dt_nasc = moment(valores.dt_nasc, 'DD/MM/YYYY').format('YYYY-MM-DD')
            valores = {...valores, dt_nasc}
        }

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({...valores, id})
            }
        })
    }

    apaga(id, res) {
        const sql = 'DELETE FROM Aluno WHERE id = ?'

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({id})
            }
        })
        
    }
}

module.exports = new Aluno