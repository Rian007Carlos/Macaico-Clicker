import { player } from './player.js';
import { addNewsletter } from './newsletter.js';
import { renderDeck, adicionarMacaicoAodeck, deckDesbloqueado } from './deck.js';
import { updateBananaDisplay } from './ui.js';
import { saveGame } from './save.js';

import { getDescription } from "./macaicos.js";

export class Upgrade {
    constructor(name, bps, cost, baseEffect, specialThresholds = []) {
        this.name = name;
        this.bps = bps;
        this.amount = 0;
        this.baseCost = cost;
        this.cost = cost;
        this.baseEffect = baseEffect;
        this.description = getDescription(name); // <- usa catálogo
        this.specialThresholds = specialThresholds;
    }

    getCurrentBPS() { return this.bps * this.amount; }

    buy(player) {
        if (player.bananas >= this.cost) {
            player.bananas -= this.cost;
            this.amount++;
            player.clickMultiplier += this.baseEffect;

            if (deckDesbloqueado) adicionarMacaicoAodeck(this);

            this.cost = Math.floor(this.baseCost * Math.pow(1.3, this.amount));
            this.checkThresholds();
            saveGame();
            return true;
        }
        return false;
    }

    checkThresholds() {
        this.specialThresholds.forEach(th => {
            if (this.amount >= th.value && !th.triggered) {
                th.triggered = true;
                th.action();
            }
        });
    }
}

export const upgrades = [
    new Upgrade("Macaico da Selva", 1, 10, 1, [{ value: 1, triggered: false, action: () => addNewsletter("Você desbloqueou um macaico novo!", "normal") }]),
    new Upgrade("Macaico Bombado", 50, 100, 5),
    new Upgrade("Macaico Mineiro", 100, 1500, 10, [{ value: 1, triggered: false, action: () => addNewsletter("Minas desbloqueadas! Agora é possível minerar Bananas Douradas.") }]),
];

