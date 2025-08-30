import { addNewsletter } from "./newsletter";
export const deckJogador = [];
export let deckDesbloqueado = false;
const maxDeckSlots = 6;

export function syncDeckVisibility() {
    const deckEl = document.getElementById("deck-container");
    if (!deckEl) return;

    if (deckDesbloqueado) {
        deckEl.classList.remove("hidden-grid"); // mostra deck
    } else {
        deckEl.classList.add("hidden-grid"); // esconde deck
    }
}

export function checarDesbloqueioDeck() {

    if (!deckDesbloqueado && player.bananas >= 2) {
        deckDesbloqueado = true;
        addNewsletter("Parabéns! Você desbloqueou seu deck de macaicos. Compre seu primeiro amigo primata!")

        syncUIFromState();
        renderDeck();
        renderUpgrades();
        saveGame();
    }

}

export function adicionarMacaicoAodeck(macaico) {
    if (deckJogador.length < maxDeckSlots) {
        deckJogador.push(macaico);
    } else {
        addNewsletter("O deck está cheio! Não é possível adicionar mais macaicos.");
    }
    renderDeck();
}

export function renderDeck() {
    const container = document.getElementById("deck-container");
    if (!container) return;

    container.innerHTML = "";
    for (let i = 0; i < maxDeckSlots; i++) {
        const slot = document.createElement("div");
        slot.classList.add("deck-slot");

        const macaico = deckJogador[i];
        if (macaico) {
            slot.textContent = `${macaico.name} (${macaico.raridade})`;
        } else {
            slot.textContent = "Vazio";
        }

        container.appendChild(slot);
    }
}

