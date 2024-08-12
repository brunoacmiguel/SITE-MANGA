// Seleciona todos os elementos com a classe 'blur-image' e 'img-container'
const images = document.querySelectorAll('.blur-image');
const imgContainers = document.querySelectorAll('.img-container');
const buyButtons = document.querySelectorAll('.buy-button');
const buscarButton = document.getElementById('buscar-pedido');
const pedidoIdInput = document.getElementById('pedido-id');
const resultadoPedidoDiv = document.getElementById('resultado-pedido');

// Configuração do IndexedDB
let db;

// Abre o IndexedDB
const request = indexedDB.open("pedidosDB", 1);

request.onupgradeneeded = function(event) {
    db = event.target.result;
    // Cria a object store para pedidos se ainda não existir
    if (!db.objectStoreNames.contains("pedidos")) {
        db.createObjectStore("pedidos", { keyPath: "id" });
    }
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log("IndexedDB aberta com sucesso.");
};

request.onerror = function(event) {
    console.error("Erro ao abrir o IndexedDB:", event.target.errorCode);
};

// Função para buscar pedido
function buscarPedido(id) {
    return new Promise((resolve, reject) => {
        // Verifica se o banco de dados está aberto
        if (!db) {
            reject('Banco de dados não está aberto.');
            return;
        }

        const transaction = db.transaction(['pedidos'], 'readonly');
        const objectStore = transaction.objectStore('pedidos');
        const request = objectStore.get(id);

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.errorCode);
        };
    });
}

// Adiciona os event listeners para as imagens
images.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.classList.add('blur');
    });

    image.addEventListener('mouseleave', () => {
        image.classList.remove('blur');
    });
});

// Adiciona os event listeners para os contêineres de imagem
imgContainers.forEach(container => {
    const button = container.querySelector('.buy-button');

    container.addEventListener('mouseenter', () => {
        button.classList.add('show');
    });

    container.addEventListener('mouseleave', () => {
        button.classList.remove('show');
    });
});

// Função para criar o modal
function createModal(name, price) {
    var modal = document.createElement('div');
    modal.setAttribute('id', 'modal');
    modal.setAttribute('class', 'modal');

    var modalContent = document.createElement('div');
    modalContent.setAttribute('id', 'modal-content');
    modalContent.setAttribute('class', 'modal-content');

    var closeButton = document.createElement('span');
    closeButton.setAttribute('id', 'close-button');
    closeButton.setAttribute('class', 'close-button');
    closeButton.innerHTML = '&times;';

    var modalHeader = document.createElement('h2');
    modalHeader.setAttribute('id', 'modal-header');
    modalHeader.setAttribute('class', 'modal-header');
    modalHeader.innerText = 'Detalhes da Compra';

    var modalBody = document.createElement('p');
    modalBody.setAttribute('id', 'modal-body');
    modalBody.setAttribute('class', 'modal-body');
    modalBody.innerHTML = `Nome do produto: ${name}<br><br>Preço do produto: R$ ${price.toFixed(2)}`;

    var modalInputs = document.createElement("div");
    modalInputs.setAttribute('id', 'modal-inputs');
    modalInputs.setAttribute('class', 'modal-inputs');

    var modalNameLabel = document.createElement("label");
    modalNameLabel.setAttribute('for', 'modal-name');
    modalNameLabel.textContent = "Seu nome";

    var modalName = document.createElement("input");
    modalName.setAttribute('id', 'modal-name');
    modalName.setAttribute('placeholder', 'Digite seu nome completo');

    var modalEmailLabel = document.createElement('label');
    modalEmailLabel.setAttribute("id", "modalEmailLabel");
    modalEmailLabel.textContent = "Digite seu email";

    var modalEmail = document.createElement("input");
    modalEmail.setAttribute("id", "modal-email");
    modalEmail.placeholder = "Digite seu email";

    var modalEnderecoLabel = document.createElement("label");
    modalEnderecoLabel.setAttribute('for', 'modal-endereco');
    modalEnderecoLabel.textContent = "Digite seu logradouro";

    var modalEndereco = document.createElement("input");
    modalEndereco.setAttribute('id', 'modal-endereco');
    modalEndereco.setAttribute('placeholder', 'Digite seu logradouro completo');

    var modalCpfLabel = document.createElement("label");
    modalCpfLabel.setAttribute('for', 'modal-cpf');
    modalCpfLabel.textContent = "Digite seu CPF";

    var modalCpf = document.createElement("input");
    modalCpf.setAttribute('id', 'modal-cpf');
    modalCpf.setAttribute('placeholder', 'Digite seu CPF');

    var modalPagamentoLabel = document.createElement("label");
    modalPagamentoLabel.setAttribute('for', 'select-pagamento');
    modalPagamentoLabel.textContent = "Forma de pagamento";

    var selectPagamento = document.createElement('select');
    selectPagamento.setAttribute('id', 'select-pagamento');

    var opcoesPagamento = ['Crédito', 'Débito', 'Pix'];
    opcoesPagamento.forEach(optionText => {
        var option = document.createElement('option');
        option.textContent = optionText;
        selectPagamento.appendChild(option);
    });

    var modalUnidadesLabel = document.createElement("label");
    modalUnidadesLabel.setAttribute('for', 'modal-unidades');
    modalUnidadesLabel.textContent = "Quantidade de unidades:";

    var modalUnidades = document.createElement("input");
    modalUnidades.setAttribute('id', 'modal-unidades');
    modalUnidades.setAttribute('type', 'number');

    var finalizarButton = document.createElement('button');
    finalizarButton.setAttribute('id', 'finalizar-button');
    finalizarButton.setAttribute('class', 'finalizar-button');
    finalizarButton.textContent = 'Finalizar Compra';

    finalizarButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal); // Remove o modal do DOM
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal); // Remove o modal do DOM
    });

    modalInputs.appendChild(modalNameLabel);
    modalInputs.appendChild(modalName);
    modalInputs.appendChild(modalEmailLabel);
    modalInputs.appendChild(modalEmail);
    modalInputs.appendChild(modalEnderecoLabel);
    modalInputs.appendChild(modalEndereco);
    modalInputs.appendChild(modalCpfLabel);
    modalInputs.appendChild(modalCpf);
    modalInputs.appendChild(modalPagamentoLabel);
    modalInputs.appendChild(selectPagamento);
    modalInputs.appendChild(modalUnidadesLabel);
    modalInputs.appendChild(modalUnidades);
    modalInputs.appendChild(finalizarButton);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalInputs);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    // Fecha o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal); // Remove o modal do DOM
        }
    }

    finalizarButton.onclick = function() {
        let endereco = modalEndereco.value;
        let email = modalEmail.value;
        let nome = modalName.value;
        let cpf = modalCpf.value;
        let formaPagamento = selectPagamento.value;
        let unidades = modalUnidades.value;
        let valorTotal = unidades * price;

        // Criar identificador único (usando timestamp)
        let id = Date.now();

        // Criar objeto com as informações
        let pedido = {
            id: id,
            endereco: endereco,
            nome: nome,
            email: email,
            cpf: cpf,
            formaPagamento: formaPagamento,
            unidades: unidades,
            valorTotal: valorTotal
        };

        // Adicionar pedido ao IndexedDB
        let transaction = db.transaction(["pedidos"], "readwrite");
        let objectStore = transaction.objectStore("pedidos");
        let request = objectStore.add(pedido);

        request.onsuccess = function() {
            console.log("Pedido adicionado com sucesso:", pedido);
        };

        request.onerror = function(event) {
            console.error("Erro ao adicionar pedido:", event.target.errorCode);
        };

        // Exibir dados
        alert(`Pedido adicionado com sucesso! ID: ${id}`);

        // Chamar a função para mostrar pedidos
        mostrarPedidos();
    };

    // Função para recuperar e exibir todos os pedidos armazenados
    function mostrarPedidos() {
        let transaction = db.transaction(["pedidos"], "readonly");
        let objectStore = transaction.objectStore("pedidos");
        let request = objectStore.openCursor();

        request.onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                console.log("Pedido:", cursor.value);
                cursor.continue();
            } else {
                console.log("Todos os pedidos foram exibidos.");
            }
        };

        request.onerror = function(event) {
            console.error("Erro ao recuperar pedidos:", event.target.errorCode);
        };
    }

    return modal;
}

// Adiciona event listeners aos botões de compra
buyButtons.forEach(button => {
    button.onclick = function() {
        const name = button.getAttribute('data-name');
        const priceString = button.getAttribute('data-price');

        // Converte o preço de string para número
        const price = parseFloat(priceString);

        // Cria o modal com o nome e o preço convertido
        const modal = createModal(name, price);
        modal.style.display = 'block';
    }
});

// Adiciona event listener ao botão de busca
// Função para atualizar um pedido no IndexedDB
function atualizarPedido(pedido) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['pedidos'], 'readwrite');
        const objectStore = transaction.objectStore('pedidos');
        const request = objectStore.put(pedido);

        request.onsuccess = function() {
            resolve();
        };

        request.onerror = function(event) {
            reject(event.target.errorCode);
        };
    });
}

// Função para remover um pedido do IndexedDB
function removerPedido(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['pedidos'], 'readwrite');
        const objectStore = transaction.objectStore('pedidos');
        const request = objectStore.delete(id);

        request.onsuccess = function() {
            resolve();
        };

        request.onerror = function(event) {
            reject(event.target.errorCode);
        };
    });
}

// Adiciona event listener ao botão de busca
buscarButton.addEventListener('click', async function() {
    const pedidoId = parseInt(pedidoIdInput.value, 10);
    if (isNaN(pedidoId)) {
        alert('Por favor, insira um ID válido.');
        return;
    }

    try {
        const pedido = await buscarPedido(pedidoId);
        if (pedido) {
            resultadoPedidoDiv.innerHTML = `
                <h3>Detalhes do Pedido</h3>
                <p><strong>ID:</strong> ${pedido.id}</p>
                <p><strong>Nome:</strong> ${pedido.nome}</p>
                <p><strong>Email:</strong> ${pedido.email}</p>
                <p><strong>Endereço:</strong> ${pedido.endereco}</p>
                <p><strong>CPF:</strong> ${pedido.cpf}</p>
                <p><strong>Forma de Pagamento:</strong> ${pedido.formaPagamento}</p>
                <p><strong>Quantidade:</strong> ${pedido.unidades}</p>
                <p><strong>Valor Total:</strong> R$ ${pedido.valorTotal.toFixed(2)}</p>
                <button id="editarPedidoButton">Editar Pedido</button>
                <button id="excluirPedidoButton">Excluir Pedido</button>
            `;

            // Adiciona eventos para os botões de editar e excluir
            document.getElementById('editarPedidoButton').addEventListener('click', () => editarPedido(pedido));
            document.getElementById('excluirPedidoButton').addEventListener('click', () => excluirPedido(pedido.id));
        } else {
            resultadoPedidoDiv.innerHTML = '<p>Pedido não encontrado.</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        resultadoPedidoDiv.innerHTML = '<p>Erro ao buscar pedido.</p>';
    }
});

// Função para editar um pedido
async function editarPedido(pedido) {
    const novoNome = prompt('Novo nome:', pedido.nome);
    const novoEmail = prompt('Novo email:', pedido.email);
    const novoEndereco = prompt('Novo endereço:', pedido.endereco);
    const novoCPF = prompt('Novo CPF:', pedido.cpf);
    const novaFormaPagamento = prompt('Nova forma de pagamento:', pedido.formaPagamento);
    const novasUnidades = parseInt(prompt('Nova quantidade:', pedido.unidades), 10);
    const novoValorTotal = parseFloat(prompt('Novo valor total:', pedido.valorTotal));

    // Atualiza o objeto pedido com os novos valores
    pedido.nome = novoNome || pedido.nome;
    pedido.email = novoEmail || pedido.email;
    pedido.endereco = novoEndereco || pedido.endereco;
    pedido.cpf = novoCPF || pedido.cpf;
    pedido.formaPagamento = novaFormaPagamento || pedido.formaPagamento;
    pedido.unidades = !isNaN(novasUnidades) ? novasUnidades : pedido.unidades;
    pedido.valorTotal = !isNaN(novoValorTotal) ? novoValorTotal : pedido.valorTotal;

    try {
        // Salva as alterações no banco de dados
        await atualizarPedido(pedido);
        alert('Pedido atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        alert('Erro ao atualizar pedido.');
    }
}

// Função para excluir um pedido
async function excluirPedido(pedidoId) {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
        try {
            // Remove o pedido do banco de dados
            await removerPedido(pedidoId);
            alert('Pedido excluído com sucesso!');
            resultadoPedidoDiv.innerHTML = '<p>Pedido excluído.</p>';
        } catch (error) {
            console.error('Erro ao excluir pedido:', error);
            alert('Erro ao excluir pedido.');
        }
    }
}


