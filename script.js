// Event listener para o menu "aleatório"
document.addEventListener('DOMContentLoaded', () => {
    const menuAleatorio = document.querySelector('#aleatorio');
    if (menuAleatorio) {
        menuAleatorio.addEventListener('click', (e) => {
            e.preventDefault();
            carregarMonstrosAleatorios();
        });
    }

    const menuLista = document.querySelector('#lista');
    if (menuLista) {
        menuLista.addEventListener('click', (e) => {
            e.preventDefault();
            carregarMonstros();
        });
    }
    const inputIDMonstro = document.querySelector('#filtro_by_id');
    inputIDMonstro.addEventListener('keyup', (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            carregarMonstrosByID(e.target.value);
        }
    });

    // Filtros avançados
    const btnFiltrar = document.querySelector('#btn_filtrar');
    btnFiltrar.addEventListener('click', () => {
        const tipo = document.querySelector('#filtro_tipo').value;
        const vidaMin = document.querySelector('#filtro_vida_min').value;
        const vidaMax = document.querySelector('#filtro_vida_max').value;
        const texto = document.querySelector('#filtro_texto').value;
        carregarMonstrosComFiltros(tipo, vidaMin, vidaMax, texto);
    });
async function carregarMonstrosComFiltros(tipo, vidaMin, vidaMax, texto) {
    try {
        let url = 'http://localhost:3000/monstros?';
        const params = [];
        if (tipo) params.push(`tipo_criatura=${encodeURIComponent(tipo)}`);
        if (vidaMin) params.push(`pontos_vida_min=${encodeURIComponent(vidaMin)}`);
        if (vidaMax) params.push(`pontos_vida_max=${encodeURIComponent(vidaMax)}`);
        if (texto) params.push(`q=${encodeURIComponent(texto)}`);
        url += params.join('&');

        const response = await fetch(url);
        const monstros = await response.json();
        renderizaMonstros(monstros);
    } catch (error) {
        console.error('Erro ao carregar monstros com filtros:', error);
        const listaMonstros = document.getElementById('listaMonstros');
        listaMonstros.textContent = 'Não foi possível carregar os monstros filtrados.';
    }
}
});


async function carregarMonstros() {
    try {
        const response = await fetch('http://localhost:3000/monstros'); // Use a URL da sua API
        const monstros = await response.json();

        renderizaMonstros(monstros);

    } catch (error) {
        console.error('Erro ao carregar monstros:', error);
        const listaMonstros = document.getElementById('listaMonstros');
        listaMonstros.textContent = 'Não foi possível carregar os monstros. A API está online?';
    }
}

async function carregarMonstrosAleatorios() {
    try {
        const response = await fetch('http://localhost:3000/monstros/random'); // Use a URL da sua API
        const monstro = await response.json();
        monstros = [monstro]
        renderizaMonstros(monstros);

    } catch (error) {
        console.error('Erro ao carregar monstros:', error);
        const listaMonstros = document.getElementById('listaMonstros');
        listaMonstros.textContent = 'Não foi possível carregar os monstros. A API está online?';
    }
}

async function carregarMonstrosByID(id) {
    try {
        const response = await fetch(`http://localhost:3000/monstros/${id}`); // Use a URL da sua API
        const monstro = await response.json();
        if(!monstro.erro){
            monstros = [monstro]
            renderizaMonstros(monstros);
        }else{
            listaMonstros.textContent = monstro.erro;
        }

    } catch (error) {
        console.error('Erro ao carregar monstros:', error);
        const listaMonstros = document.getElementById('listaMonstros');
        listaMonstros.textContent = 'Não foi possível carregar os monstros. A API está online?';
    }
}

function renderizaMonstros(monstros) {
    const listaMonstros = document.getElementById('listaMonstros');
    listaMonstros.innerHTML = ''; // Limpa a lista antes de adicionar

    monstros.forEach(monstro => {
        const li = document.createElement('li');

        // Nome do monstro
        const nomeTitulo = document.createElement('h2');
        nomeTitulo.textContent = monstro.nome;
        li.appendChild(nomeTitulo);

        // Imagem do monstro (se existir)
        if (monstro.imagem) {
            const img = document.createElement('img');
            img.src = monstro.imagem;
            img.alt = `Imagem de ${monstro.nome}`;
            img.style.maxWidth = '120px';
            img.style.display = 'block';
            img.style.margin = '10px auto';
            li.appendChild(img);
        }

        const pDescricao = document.createElement('p');
        pDescricao.innerHTML = `<b>Descrição</b>: ${monstro.descricao}`;
        li.appendChild(pDescricao);

        const pTipo = document.createElement('p');
        pTipo.innerHTML = `<b>Tipo</b>: ${monstro.tipo_criatura}`;
        li.appendChild(pTipo);

        const pVida = document.createElement('p');
        pVida.innerHTML = `<b>Vida</b>: ${monstro.pontos_vida}`;
        li.appendChild(pVida);

        const pAtaque = document.createElement('p');
        pAtaque.innerHTML = `<b>Ataque</b>: ${monstro.ataque}`;
        li.appendChild(pAtaque);

        const pDefesa = document.createElement('p');
        pDefesa.innerHTML = `<b>Defesa</b>: ${monstro.defesa}`;
        li.appendChild(pDefesa);

        const pHabitat = document.createElement('p');
        pHabitat.innerHTML = `<b>Habitat</b>: ${monstro.habitat}`;
        li.appendChild(pHabitat);

        listaMonstros.appendChild(li);
    });
}
