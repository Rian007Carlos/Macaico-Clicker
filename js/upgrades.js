import { player } from './player.js';
import { macaicoDescriptions } from './macaicos.js';
import { adicionarMacaicoAodeck, deckDesbloqueado } from './deck.js';
import { addNewsletter } from './newsletter.js';
import { saveGame } from './gameState.js';
import { formatNumber } from './utils.js';
import { renderUpgrades as renderUpgradesUI, updateBananaDisplay } from './ui.js';


export const upgrades = [
    //(name, bps, cost, baseEffect)
    new Upgrade("Macaico da Selva", 1, 10, 1, [{ value: 1, triggered: false, action: () => addNewsletter("Você desbloqueou um macaico novo!", "normal") }]),
    new Upgrade("Macaico Bombado", 50, 100, 5),
    new Upgrade("Macaico Mineiro", 100, 1500, 10, [{ value: 1, triggered: false, action: () => addNewsletter("Minas desbloqueado! Agora é possível minerar Bananas Douradas.") }]),
    new Upgrade("Macaico Lutador", 250, 10000, 25),
    new Upgrade("Macaico Falante", 700, 100000, 70),
    new Upgrade("Macaico Trader", 1500, 1000000, 150),
    new Upgrade("Macaico Cientista", 3000, 50000000, 300, [{ value: 50, triggered: false, action: () => addNewsletter("Laboratório desbloqueado! Pesquisas de bananas disponíveis.") }]),
    new Upgrade("Macaico Místico", 10000, 1000000000, 1000),
]

export class Upgrade {
    constructor(name, bps, cost, baseEffect, spectialThresholds = []) {
        this.name = name;
        this.bps = bps;
        this.amount = 0;
        this.baseCost = cost;
        this.cost = cost;
        this.baseEffect = baseEffect;
        this.description = macaicoDescriptions[name];
        this.spectialThresholds = spectialThresholds

    }

    getCurrentBPS() {
        return this.bps * this.amount;
    };

    getDescription() {
        return this.description;
    };

    buy(player) {
        if (player.bananas >= this.cost) {
            player.bananas -= this.cost;
            this.amount++;
            player.clickMultiplier += this.baseEffect

            if (deckDesbloqueado) {
                adicionarMacaicoAodeck(this);
            }
            this.cost = Math.floor(this.baseCost * Math.pow(1.3, this.amount));
            this.checkTresholds();
            saveGame();
            return true;
        }

        return false;
    };

    checkTresholds() {
        this.spectialThresholds.forEach(th => {
            if (this.amount >= th.value && !th.triggered) {
                th.triggered = true
                th.action()
            }
        })
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