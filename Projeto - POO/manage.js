document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('adicionar-form');
    const mangaContainer = document.getElementById('manga-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome-manga').value;
        const preco = parseFloat(document.getElementById('preco-manga').value);
        const imagem = document.getElementById('imagem-manga').value;

        // Cria um novo elemento para o manga
        const mangaItem = document.createElement('div');
        mangaItem.className = 'manga-item';

        mangaItem.innerHTML = `
            <img src="${imagem}" alt="${nome}">
            <h3>${nome}</h3>
            <p>Preço: R$ ${preco.toFixed(2)}</p>
        `;

        mangaContainer.appendChild(mangaItem);

        // Limpa o formulário
        form.reset();
    });
});
