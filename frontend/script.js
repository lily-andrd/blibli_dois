async function listarLivros(){

    const resposta = await fetch(
        "http://127.0.0.1:8000/livros"
    );

    const livros = await resposta.json();

    const lista = document.getElementById("lista");

    lista.innerHTML = "";

    livros.forEach(livro => {

        lista.innerHTML += `
            <li>
                ${livro.titulo}
                -
                ${livro.autor}
            </li>
        `;

    });

}

const containerResultados = document.getElementById('resultadosBusca');
const inputBusca = document.getElementById('inputBusca');
const btnBusca = document.getElementById('btnBusca');

function exibirLivros(listaDeLivros) {
    containerResultados.innerHTML = "";

    if (listaDeLivros.length === 0) {
        containerResultados.innerHTML = "<p>Nenhum livro encontrado.</p>";
        return;
    }

    listaDeLivros.forEach(livro => {
        const card = document.createElement('div');
        card.classList.add('card-livro');

        const img = document.createElement('img');
        img.src = livro.imagem;

        const titulo = document.createElement('h3');
        titulo.textContent = livro.titulo;

        const autor = document.createElement('p');
        autor.textContent = `Autor: ${livro.autor}`;

        const status = document.createElement('p');
        status.textContent = livro.disponivel ? "Disponível" : "Indisponível";
        status.classList.add(livro.disponivel ? "disponivel" : "indisponivel");

        const botao = document.createElement('button');
        botao.textContent = "Reservar";

        botao.addEventListener('click', () => {
            livro.disponivel = false;
            botao.textContent = "Reservado!";
            botao.disabled = true;
            status.textContent = "Indisponível";
            status.classList.replace('disponivel', 'indisponivel');
        });

        card.appendChild(img);
        card.appendChild(titulo);
        card.appendChild(autor);
        card.appendChild(status);
        card.appendChild(botao);
        containerResultados.appendChild(card);
    });
}

function realizarBusca() {
    const termo = inputBusca.value.toLowerCase();
    
    const livrosFiltrados = livrosEncontrados.filter(livro => 
        livro.titulo.toLowerCase().includes(termo) || 
        livro.autor.toLowerCase().includes(termo)
    );

    exibirLivros(livrosFiltrados);
}

// Eventos da Busca
btnBusca.addEventListener('click', realizarBusca);

// Permite buscar ao apertar "Enter"
inputBusca.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') realizarBusca();
});

// Inicializa a página
exibirLivros(livrosEncontrados); 
async function carregarLivros() {

    const resposta = await fetch(`${API}/livros`);

    const dados = await resposta.json();

    livrosEncontrados = dados.dados;
  carregarLivros();
}
