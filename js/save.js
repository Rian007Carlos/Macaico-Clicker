// js/save.js
import { player } from "./player.js";
import { upgrades } from "./upgrades.js";
import { deckJogador, renderDeck } from "./deck.js";
import { syncUIFromState, renderUpgrades, updateBananaDisplay } from "./ui.js";


// estado global de desbloqueio
import { deckDesbloqueado, setDeckDesbloqueado } from "./state.js";
import { newsletterQueue } from "./newsletter.js";

// ======= Local Storage =======
export function saveGame() {
    const saveData = {
        player: { ...player },
        upgrades: upgrades.map(u => ({
            name: u.name,
            amount: u.amount,
            cost: u.cost
        })),
        deckJogador: deckJogador.map(m => ({
            name: m.name,
            raridade: m.raridade
        })),
        deckDesbloqueado
    };

    localStorage.setItem("macaicoClickerSave", JSON.stringify(saveData));
}

export function loadGame() {
    const saved = localStorage.getItem("macaicoClickerSave");
    if (!saved) return;

    const saveData = JSON.parse(saved);

    // player
    Object.assign(player, saveData.player || {});

    // upgrades
    if (Array.isArray(saveData.upgrades)) {
        saveData.upgrades.forEach(savedUpg => {
            const upg = upgrades.find(u => u.name === savedUpg.name);
            if (upg) {
                upg.amount = savedUpg.amount;
                upg.cost = savedUpg.cost;
            }
        });
    }

    // deck
    deckJogador.length = 0;
    if (Array.isArray(saveData.deckJogador)) {
        saveData.deckJogador.forEach(m => {
            const upgradeObj = upgrades.find(u => u.name === m.name);
            if (upgradeObj) {
                deckJogador.push({
                    name: upgradeObj.name,
                    raridade: m.raridade
                });
            }
        });
    }

    // flag de desbloqueio
    setDeckDesbloqueado(!!saveData.deckDesbloqueado);

    // >>> MUITO IMPORTANTE: sincronizar UI SEM MEXER EM innerHTML
    syncUIFromState();
    renderDeck();
    renderUpgrades();
    updateBananaDisplay();
}

export function resetGame() {
    if (confirm("Tem certeza que quer resetar o jogo?")) {
        localStorage.removeItem("macaicoClickerSave");

        // estado
        player.bananas = 0;
        player.clickMultiplier = 1;

        upgrades.forEach(u => {
            u.amount = 0;
            u.cost = u.baseCost;
        });

        deckJogador.length = 0;
        setDeckDesbloqueado(false);

        // UI + feedback
        newsletterQueue.length = 0;
        syncUIFromState();
        renderNewsletter();
        updateBananaDisplay();
        renderUpgrades();
    }
}
