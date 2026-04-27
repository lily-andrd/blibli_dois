const livrosEncontrados = [
    { id: 1, titulo: "50 Tons de cinza", autor: "E. L. James", disponivel: true, imagem: "https://m.media-amazon.com/images/I/61TfhwBAMaL._AC_UF1000,1000_QL80_.jpg" },
    { id: 2, titulo: "1984", autor: "George Orwell", disponivel: true, imagem: "https://m.media-amazon.com/images/I/61t0bwt1s3L._AC_UF1000,1000_QL80_.jpg" },
    { id: 3, titulo: "Sociedade líquida", autor: "Zygmunt Bauman", disponivel: true, imagem: "https://m.media-amazon.com/images/I/51RuPVku+sS.jpg" },
    { id: 4, titulo: "After", autor: "Anna Todd", disponivel: true, imagem: "https://m.media-amazon.com/images/I/81zCMLjshVL._UF1000,1000_QL80_.jpg" },
    { id: 5, titulo: "The Vampire Diaries", autor: "L.J. Smith", disponivel: true, imagem: "https://m.media-amazon.com/images/I/71IB3b3XAsL.jpg" },
    { id: 6, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", disponivel: true, imagem: "https://m.media-amazon.com/images/I/81SVIwe5L9L._UF1000,1000_QL80_.jpg" },
];

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

// Lógica de Busca
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