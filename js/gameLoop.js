import { macaicos } from './macaicos.js';
import { updateUI } from './ui.js';
import { player } from './player.js';

// ===== Loop Principal =====
export function autoCollect() {
    // Soma a produção automática dos macaicos
    let bananasPerTick = 0;
    macaicos.forEach(m => {
        bananasPerTick += m.production * m.level;
    });

    player.bananas += bananasPerTick;

    // Atualiza HUD
    updateUI();
}

// ===== Inicializar loop =====
export function startGameLoop() {
    // Executa a cada 1 segundo (1000 ms)
    setInterval(autoCollect, 1000);
}