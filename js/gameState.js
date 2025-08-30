function saveGame() {
    const saveData = {
        player: { ...player },
        upgrades: upgrades.map(u => ({ name: u.name, amount: u.amount, cost: u.cost })),
        deckJogador: deckJogador.map(m => ({
            name: m.name,
            raridade: m.raridade
        })),
        deckDesbloqueado
    };
    localStorage.setItem('macaicoClickerSave', JSON.stringify(saveData));
}

function loadGame() {
    const saved = localStorage.getItem('macaicoClickerSave');
    if (!saved) return;

    const saveData = JSON.parse(saved);
    //player
    Object.assign(player, saveData.player || {});

    //upgrades
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
        })
    }

    // flag de desbloqueio
    deckDesbloqueado = !!saveData.deckDesbloqueado;

    // >>> MUITO IMPORTANTE: sincronizar UI SEM MEXER EM innerHTML
    syncUIFromState();

    // Render básico
    renderDeck();
    renderUpgrades();
    updateBananaDisplay();

}

// ======= Reset do jogo =======
document.getElementById('reset-game').addEventListener('click', () => {
    if (confirm("Tem certeza que quer resetar o jogo?")) {
        localStorage.removeItem('macaicoClickerSave');
        player.bananas = 0;
        player.clickMultiplier = 1;

        upgrades.forEach(u => {
            u.amount = 0;
            u.cost = u.baseCost
        });

        deckJogador.length = 0;
        deckDesbloqueado = false;

        // UI + feedback
        newsletterQueue.length = 0;

        syncUIFromState();
        renderNewsletter();
        updateBananaDisplay();
        renderUpgrades();
    }
});