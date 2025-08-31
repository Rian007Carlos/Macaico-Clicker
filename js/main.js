
import { loadGame, saveGame } from './gameState.js';
import { updateBananaDisplay, renderUpgrades } from './ui.js';
import { autoCollect } from './autoCollect.js';


// ======= Inicialização =======
loadGame();
syncUIFromState();
updateBananaDisplay();
renderUpgrades();
setInterval(autoCollect, 1000); // coleta automática
setInterval(saveGame, 5000); // salvar a cada 5 segundos
