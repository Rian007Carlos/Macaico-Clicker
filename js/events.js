import { player } from "./player.js";
import { upgradeBananaDisplay } from "./ui.js";

export function initEvents() {
    const banana = document.getElementById("banana");

    banana.addEventListener("click", () => {
        player.bananas += player.multipliers;
        upgradeBananaDisplay();
        console.log(player.bananas);
        console.log("click")
    });
}
