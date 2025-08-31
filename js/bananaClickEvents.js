import { player } from "./player";
import { updateBananaDisplay } from "./ui";
import { renderUpgrades } from "./upgrades";
import { checarDesbloqueioDeck } from "./deck";

const bananaEl = document.getElementById('banana');
bananaEl.addEventListener('click', () => {
    player.bananas += player.clickMultiplier;
    updateBananaDisplay();
    renderUpgrades();
    checarDesbloqueioDeck();
});