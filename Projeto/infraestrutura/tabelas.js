class Tabelas {
    init(conexao){
        this.conexao = conexao

        this.criarAtendimentos()
    }

    criarAtendimentos(){
         const sql = 'CREATE TABLE IF NOT EXISTS ALuno (id int not null AUTO_INCREMENT, nome varchar(100) not null, dt_nasc date not null, cpf varchar(14) null, PRIMARY KEY(id))'
        
         this.conexao.query(sql, erro => {
             if(erro){
                 console.log(erro)
             }
             else{
                 console.log('Tabela de alunos criada com sucesso')
             }
         })
    }

}

module.exports = new Tabelas