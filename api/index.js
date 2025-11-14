// 1. Importar o módulo Express
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path')

// arquivo banco de dados
const DB_FILE = path.join(__dirname, 'monstros.db');

//conexão com o banco de dados
const db = new Database(DB_FILE);

// 2. Criar uma instância do aplicativo Express
const app = express();
app.use(cors({ origin: '*' }));

// 3. Definir a porta em que o servidor irá escutar
// Usamos process.env.PORT para compatibilidade com ambientes de hospedagem (como Heroku)
// ou a porta 3000 como padrão se a variável de ambiente não estiver definida.
const PORT = process.env.PORT || 3000;


// Faz o aplicativo Express começar a "escutar" por requisições na porta definida.
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/monstros`);
});

// --- Rotas da API ---
// Rota GET para listar todos os monstros
// Quando alguém fizer uma requisição GET para a URL base + '/monstros'
// (ex: http://localhost:3000/monstros), esta função será executada.
app.get('/monstros', (req, res) => {
    const tipoCriatura = req.query.tipo_criatura;
    const pontosVidaMin = req.query.pontos_vida_min;
    const pontosVidaMax = req.query.pontos_vida_max;
    const buscaTexto = req.query.busca_texto;

    let resultado = getAllMonstros;

    if (tipoCriatura) {
        resultado = resultado.filter(m => m.tipo_criatura = tipoCriatura);
    }

    else if (pontosVidaMin) {
        resultado = resultado.filter(m => m.pontos_vida < Number (pontosVidaMin)); 
    }

    else if (pontosVidaMax) {
        resultado = resultado.filter(m => m.pontos_vida > Number (pontosVidaMax));
    }

    if (buscaTexto) {
       const texto = buscaTexto.toLowercCase();
       resultado = resultado.filter(m=> m.nome && m.nome.toLowerCase().includes (texto)) || 
       (m.descricao && m.descricao.toLowerCase().includes(texto))
        
    };

res.json(resultado);
    });


//GRUPO SCP


app.get('/monstros/random', (req, res) => {
    let resultado = getAllMonstros();
    if (monstros.length > 0){
        const index = Math.floor(Math.random() * monstros.length);
        res.json(monstros[index]);
    } else {
        res.status(404).json({ erro: "Nenhum monstro encontrado." });
    }
});

//rota GET para retornar monstro por ID
app.get('/monstros/:monstros_id', (req, res) => {
    const id = Number(req.params.monstros_id);
    const monstro = db.getMonstrosById(id);

    if(monstro){
        res.json(monstro);
    } else {
        res.status(400).json({ erro:'Nenhum monstro foi encontrado.'})
    }

})

//Rota para criar um monstro
app.post('/monstros', (req, res)=> {
    const corpo = req.body;
    const novo_monstro = insertMonstro(corpo);
    return res.status(201).json(novo_monstro)
});


// Funções de banco de dados
function getAllMonstros(){
    const resultado = db.prepare('SELECT * FROM monstros')
    return resultado.all();
}

function getMonstrosById(id){
    const resultado = db.prepare('SELECT * FROM monstros WHERE id = ? ')
    return resultado.get(id);
}

function insertMonstro(monstro) {
    const resultado = db.prepare(`
        INSERT INDO monstros(
            nome,
            imagem,
            descricao,
            tipo_criatura,
            pontos_vida,
            ataque, 
            defesa,
            habitat
        )
        
        VALUES (@nome, @image, @descricao, @tipo_criatura, @pontos_vida, @ataque, @defesa, @habitat)
        `)
    const novo = resultado.run(
        {
            nome: monstro.nome,
            imagem: monstro.imagem,
            descricao: monstro.descricao,
            tipo_criatura: monstro.tipo_criatura,
            pontos_vida: monstro.pontos_vida,
            ataque: monstro.ataque, 
            defesa: monstro.defesa,
            habitat: monstro.habitat
        }
    )
    return getMonstrosById(novo.lastInsertRowid)
}




