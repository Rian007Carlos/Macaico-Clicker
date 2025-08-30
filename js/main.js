import { player } from "../js/player.js"

// ======= Inicialização =======
loadGame();
syncUIFromState();
updateBananaDisplay();
renderUpgrades();
setInterval(autoCollect, 1000); // coleta automática
setInterval(saveGame, 5000); // salvar a cada 5 segundos
