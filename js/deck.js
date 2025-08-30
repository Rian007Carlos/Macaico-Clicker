import { player } from './player.js';
import { addNewsletter } from './newsletter.js';
import { renderUpgrades } from './upgrades.js';
import { makeDeckEntryFromUpgrade } from "./macaicos.js";

export const deckJogador = [];
export const maxDeckSlots = 6;
export let deckDesbloqueado = false;

export function syncDeckVisibility() {
    const deckEl = document.getElementById("deck-container");
    if (!deckEl) return;

    if (deckDesbloqueado) deckEl.classList.remove("hidden-grid");
    else deckEl.classList.add("hidden-grid");
}

export function syncUpgradeButton() {
    const btn = document.getElementById("toggle-upgrades");
    const upgradeMenu = document.getElementById("upgrade-menu");

    if (deckDesbloqueado) {
        btn.classList.remove("locked");
        upgradeMenu.classList.add("hidden");
    } else {
        btn.classList.add("locked");
        upgradeMenu.classList.add("hidden");
    }
}

export function syncUIFromState() {
    syncUpgradeButton();
    syncDeckVisibility();
}

export function checarDesbloqueioDeck() {
    if (!deckDesbloqueado && player.bananas >= 2) {
        deckDesbloqueado = true;
        addNewsletter("Parabéns! Você desbloqueou seu deck de macaicos. Compre seu primeiro amigo primata!");
        syncUIFromState();
        renderDeck();
        renderUpgrades();
        saveGame();
    }
}

export function renderDeck() {
    const container = document.getElementById("deck-container");
    if (!container) return;

    container.innerHTML = "";
    for (let i = 0; i < maxDeckSlots; i++) {
        const slot = document.createElement("div");
        slot.classList.add("deck-slot");

        const macaico = deckJogador[i];
        slot.textContent = macaico ? `${macaico.name} (${macaico.raridade})` : "Vazio";

        container.appendChild(slot);
    }
}

export function adicionarMacaicoAodeck(upgradeObj) {
    if (deckJogador.length < maxDeckSlots) {
        deckJogador.push(makeDeckEntryFromUpgrade(upgradeObj));
    } else {
        addNewsletter("O deck está cheio! Não é possível adicionar mais macaicos.");
    }
    renderDeck();
}
