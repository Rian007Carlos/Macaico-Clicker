import { addNewsletter } from "./newsletter";

document.querySelectorAll("[id^='toggle-']").forEach(btn => {
    btn.addEventListener("click", () => {
        // Se o botão estiver bloqueado, não faz nada (feedback opcional)
        if (btn.classList.contains("locked")) {
            addNewsletter("Colete 100 bananas e algo legal pode acontecer!");
            return;
        }

        const targetId = btn.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;

        // Alterna o container (menu-upgrades, menu-config, menu-achievements...)
        targetEl.classList.toggle("hidden");

        // Caso o que foi aberto seja o container de upgrades, garante que o conteúdo
        // interno 'upgrade-menu' esteja visível (pode ter sido marcado hidden antes)
        if (targetId === "menu-upgrades") {
            const upgradeMenu = document.getElementById("upgrade-menu");
            if (upgradeMenu && !targetEl.classList.contains("hidden")) {
                upgradeMenu.classList.remove("hidden");
            }
        }
    });
});