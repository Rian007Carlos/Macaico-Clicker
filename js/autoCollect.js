function autoCollect() {
    let totalBPS = upgrades.reduce((sum, u) => sum + u.getCurrentBPS(), 0);
    player.bananas += totalBPS;


    updateBananaDisplay();
    renderUpgrades();

    // Tick de pesquisas
    researches.forEach(r => r.tick())

    // Rodar thresholds de upgrades
    upgrades.forEach(u => u.checkTresholds())

}