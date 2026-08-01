let carrinho = [];
let todosProdutos = []; 

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos();

    // Listener do Filtro de Marca
    const brandSelect = document.getElementById('brand-select');
    if (brandSelect) {
        brandSelect.addEventListener('change', aplicarFiltros);
    }

    // Listener do Filtro de Ordenação por Preço
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', aplicarFiltros);
    }

    // Fechar modal no botão "X"
    const modalClose = document.getElementById('modal-close');
    const modal = document.getElementById('image-modal');

    if (modalClose) {
        modalClose.addEventListener('click', fecharModal);
    }

    // Fechar modal ao clicar fora
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                fecharModal();
            }
        });
    }

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });

    // Clique no botão de reservar
    const btnCheckout = document.getElementById('btn-checkout');
    if (btnCheckout) {
        btnCheckout.addEventListener('click', finalizarReserva);
    }
});

// 1. Carregar produtos do JSON
async function carregarProdutos() {
    try {
        const resposta = await fetch('data.json');
        const dados = await resposta.json();
        
        todosProdutos = dados.produtos;
        preencherOpcoesMarcas(todosProdutos);
        renderizarProdutos(todosProdutos);
    } catch (erro) {
        console.error('Erro ao carregar os veículos do JSON:', erro);
    }
}

// 2. Extrai as marcas automaticamente dos nomes e preenche o <select>
function preencherOpcoesMarcas(produtos) {
    const brandSelect = document.getElementById('brand-select');
    if (!brandSelect) return;

    // Extrai a primeira palavra do nome como marca (ex: "Porsche 911" -> "Porsche")
    const marcasSet = new Set();
    produtos.forEach(p => {
        const primeiraPalavra = p.nome.trim().split(' ')[0];
        marcasSet.add(primeiraPalavra);
    });

    // Converte para array e ordena em ordem alfabética
    const marcasOrdenadas = Array.from(marcasSet).sort();

    // Adiciona as marcas como <option> no HTML
    marcasOrdenadas.forEach(marca => {
        const option = document.createElement('option');
        option.value = marca;
        option.textContent = marca;
        brandSelect.appendChild(option);
    });
}

// 3. Aplica os filtros simultâneos (Marca + Preço)
function aplicarFiltros() {
    const marcaSelecionada = document.getElementById('brand-select').value;
    const ordenacaoSelecionada = document.getElementById('sort-select').value;

    let resultado = [...todosProdutos];

    // Filtra por Marca
    if (marcaSelecionada !== 'todas') {
        resultado = resultado.filter(p => p.nome.toLowerCase().startsWith(marcaSelecionada.toLowerCase()));
    }

    // Ordena por Preço
    if (ordenacaoSelecionada === 'menor-preco') {
        resultado.sort((a, b) => a.preco - b.preco);
    } else if (ordenacaoSelecionada === 'maior-preco') {
        resultado.sort((a, b) => b.preco - a.preco);
    }

    renderizarProdutos(resultado);
}

// 4. Renderizar Cards na Tela
function renderizarProdutos(lista) {
    const gridProdutos = document.getElementById('grid-produtos');
    gridProdutos.innerHTML = '';

    if (lista.length === 0) {
        gridProdutos.innerHTML = `<div class="no-results">Nenhum veículo encontrado para os filtros selecionados.</div>`;
        return;
    }

    lista.forEach(produto => {
        const cardHTML = `
            <article class="card">
                <img src="${produto.img}" alt="${produto.nome}" onclick="abrirModal('${produto.img}', '${produto.nome}')" title="Clique para ampliar">
                <div class="card-body">
                    <h4 class="card-title">${produto.nome}</h4>
                    <p class="card-description">${produto.descricao}</p>
                    <div class="card-footer-box">
                        <span class="card-price">${produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.id}, '${produto.nome}', ${produto.preco})">
                            Reservar
                        </button>
                    </div>
                </div>
            </article>
        `;
        gridProdutos.innerHTML += cardHTML;
    });
}

// 5. Modal de Imagem
function abrirModal(srcImg, titulo) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');

    modal.style.display = 'block';
    modalImg.src = srcImg;
    modalCaption.textContent = titulo;
}

function fecharModal() {
    const modal = document.getElementById('image-modal');
    modal.style.display = 'none';
}

// 6. Funções da Garagem / Carrinho
function adicionarAoCarrinho(id, nome, preco) {
    carrinho.push({ id, nome, preco });
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const cartItemsElement = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total-value');
    
    cartItemsElement.innerHTML = '';
    let total = 0;

    carrinho.forEach((item, index) => {
        total += item.preco;
        
        const itemHTML = `
            <li class="cart-item">
                <span>${item.nome}</span>
                <strong>${item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                <button class="btn-remove" onclick="removerDoCarrinho(${index})">X</button>
            </li>
        `;
        cartItemsElement.innerHTML += itemHTML;
    });

    totalElement.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function finalizarReserva() {
    if (carrinho.length === 0) {
        alert('Sua garagem está vazia! Escolha ao menos um veículo para reservar.');
        return;
    }

    const totalFormatado = document.getElementById('cart-total-value').textContent;
    
    alert(`🎉 Veículo(s) reservado(s) com sucesso!\n\nTotal da Reserva: ${totalFormatado}\n\nNossa equipe da Lux Motors entrará em contato para agendar o test-drive!`);

    carrinho = [];
    atualizarCarrinho();
}