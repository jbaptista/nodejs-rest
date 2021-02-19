const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const ext = path.extname(caminho)
    const tiposValidos = ['jpg','png','jpeg']
    const tipoEhInvalido = tiposValidos.indexOf(ext.substring(1)) === -1

    if(tipoEhInvalido){
        const erro = 'Tipo é inválido'
        console.log('Erro! Tipo inválido!')
        callbackImagemCriada(erro)
    }
    else{
        const caminhoDestino = `./assets/imagens/${nomeDoArquivo}${ext}`

        fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(caminhoDestino))
        .on('finish', () => callbackImagemCriada(false, caminhoDestino))
    }


    
}