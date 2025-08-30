import { player } from './player.js';
import { addNewsletter } from './newsletter.js';
import { showCardReveal } from './ui.js';
import { upgrades, renderUpgrades } from './upgrades.js';

export const shopCategories = {
    common: { cost: 100, macaicos: ["Macaico da Selva", "Macaico Bombado", "Macaico Mineiro"] },
    rare: { cost: 1000, macaicos: ["Macaico Lutador", "Macaico Falante"] }
};

export function renderStoreCategories() {
    const container = document.getElementById('store-categories');
    if (!container) return;

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
            buyPack(key);
        });
    });
}

export function buyPack(rarity) {
    const pack = shopCategories[rarity];
    if (!pack) return;

    if (player.bananas < pack.cost) {
        addNewsletter("Bananas insuficientes!", "normal");
        return;
    }

    player.bananas -= pack.cost;

    const randomIndex = Math.floor(Math.random() * pack.macaicos.length);
    const macaico = pack.macaicos[randomIndex];

    if (!player.deck[macaico]) player.deck[macaico] = 1;
    else player.deck[macaico]++;

    addNewsletter(`Novo macaico obtido: ${macaico}!`, "normal");
    showCardReveal(macaico);
    renderUpgrades();
}
