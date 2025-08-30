
import { player } from "./player.js"
import { saveGame } from './save.js';
import { upgrades } from "./upgrades.js";

// ======= Funções de UI e utilitários=======

export function formatNumber(num) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
}



// Função genérica para criar cards
export function createCard({ title, lines, description, buttonText, buttonAction }) {
    const card = document.createElement('div');
    card.classList.add('upgrade-card');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('upgrade-info');

    lines.forEach(line => {
        const el = document.createElement('div');
        el.textContent = line;
        infoDiv.appendChild(el);
    });

    const descDiv = document.createElement('div');
    descDiv.classList.add('upgrade-description');
    descDiv.textContent = description;

    const btn = document.createElement('button');
    btn.textContent = buttonText;
    btn.addEventListener('click', buttonAction);

    card.appendChild(infoDiv);
    card.appendChild(descDiv);
    card.appendChild(btn);

    return card;
}



export function updateBananaDisplay() {
    document.getElementById('banana-count').textContent = formatNumber(player.bananas);

    let totalBPS = upgrades.reduce((sum, u) => sum + u.getCurrentBPS(), 0);

    const cpsInfo = document.getElementById("cps-info")
    const bpsInfo = document.getElementById("bps-info")

    if (cpsInfo && bpsInfo) {
        cpsInfo.textContent = `+${formatNumber(player.clickMultiplier)} por clique`;
        bpsInfo.textContent = `+${formatNumber(totalBPS)} por segundo`;
    }

}



export function renderUpgrades() {
    const menu = document.getElementById('upgrade-menu');
    menu.innerHTML = '';

    upgrades.forEach(upg => {
        const lines = [
            `Nome: ${upg.name}`,
            `Comprado: ${upg.amount}`,
            `Custo: ${formatNumber(upg.cost)}`,
            `Coleta: ${formatNumber(upg.getCurrentBPS())} bananas/segundo`
        ];

        const card = createCard({
            title: upg.name,
            lines: lines,
            description: upg.description,
            buttonText: 'Comprar',
            buttonAction: () => {
                if (upg.buy(player)) {
                    updateBananaDisplay();
                    renderUpgrades();
                    saveGame();
                }
            }
        });
        // Desabilitar botão se não houver bananas suficientes
        if (player.bananas < upg.cost) card.querySelector('button').disabled = true;

        menu.appendChild(card);
    });
}


export function renderUpgradeMenu() {
    const menu = document.getElementById("upgrade-menu")
    upgrades.forEach(upg => {

    })
}

export function syncUIFromState() {
    updateBananaDisplay();
    renderDeck();
    renderUpgrades();
    renderNewsletter();
}

