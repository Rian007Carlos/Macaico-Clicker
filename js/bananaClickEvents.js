

const bananaEl = document.getElementById('banana');
bananaEl.addEventListener('click', () => {
    player.bananas += player.clickMultiplier;
    updateBananaDisplay();
    renderUpgrades();
    checarDesbloqueioDeck();
});