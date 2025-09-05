// Copie o código abaixo e cole no seu arquivo index.js


// Criando uma nova rota que recebe um ID pela URL. `:monstro_id`
app.get('/monstros/:monstro_id', (req, res) => {

    // Descubra como pegar o ID passado pela URL através do atributo req.params 
    let id = req.params._____;
    // Pesquise sobre o método find em javascript e filtre o monstro por ID.
    // Vale 15 pts
    let monstro = ________________ ;

    if (monstro) {
        res.json(monstro)
    } else {
        res.status(404).json({ erro: 'Nenhum monstro encontrado.' });
    }
});