import { formatNumber } from "./utils";

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

export function syncUIFromState() {
    syncUpgradeButton();
    syncDeckVisibility();
}

