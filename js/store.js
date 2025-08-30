import { addNewsletter } from "./newsletter";

const shopCategories = {
    common: {
        cost: 100,
        macaicos: [
            "Macaico da Selva",
            "Macaico Bombado",
            "Macaico Mineiro"
        ]
    },
    rare: {
        cost: 1000,
        macaicos: [
            "Macaico Lutador",
            "Macaico Falante"
        ]
    }
    // épico, lendário, etc depois
};

function renderStoreCategories() {
    const container = document.getElementById('store-categories');
    container.innerHTML = '';

    Object.entries(shopCategories).forEach(([key, cat]) => {
        const card = document.createElement('div');
        card.classList.add('store-card');
        card.innerHTML = `
            <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p>Custo: ${cat.cost} bananas</p>
            <button>Comprar pacote</button>
        `;

        container.appendChild(card);

        card.querySelector('button').addEventListener('click', () => {
            buyPack(key); // chama a função de compra com a raridade
            updateBananaDisplay(); // atualiza bananas
        });
    });
}

// Abrir/fechar loja
document.addEventListener('DOMContentLoaded', () => {
    const toggleStoreBtn = document.getElementById('toggle-store');
    const storeMenu = document.getElementById('store-menu');
    const closeStoreBtn = document.getElementById('close-store');

    toggleStoreBtn.addEventListener('click', () => {
        storeMenu.classList.remove('hidden');
        renderStoreCategories(); // renderiza os pacotes
    });

    closeStoreBtn.addEventListener('click', () => {
        storeMenu.classList.add('hidden');
    });

    // Todos os outros listeners que dependem do DOM também podem ficar aqui
});


function buyPack(rarity) {
    const pack = shopCategories[rarity];
    if (!pack) return;

    if (player.bananas < pack.cost) {
        addNewsletter("Bananas insuficientes!", "normal");
        return;
    }

    player.bananas -= pack.cost;

    // Sorteia um macaico da categoria
    const randomIndex = Math.floor(Math.random() * pack.macaicos.length);
    const macaico = pack.macaicos[randomIndex];

    // Adiciona ao deck
    if (!player.deck[macaico]) {
        player.deck[macaico] = 1;
        addNewsletter(`Novo macaico obtido: ${macaico}!`, "normal");
    } else {
        player.deck[macaico]++;
        addNewsletter(`${macaico} já estava no deck! Contador aumentado para ${player.deck[macaico]}.`, "funny");
    }

    // Aqui você pode exibir uma animação de "carta revelada"
    showCardReveal(macaico);
}

function showCardReveal(macaico) {
    const popupContainer = document.getElementById("popup-container");

    const card = document.createElement("div");
    card.classList.add("card-popup");
    card.innerHTML = `
        <h3>${macaico}</h3>
        <p>Adicionado ao deck!</p>
        <button onclick="this.parentElement.remove()">Fechar</button>
    `;

    popupContainer.appendChild(card);
}

