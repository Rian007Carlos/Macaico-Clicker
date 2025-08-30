import { player } from "/js/player.js";

// ======= Deck do jogador =======

const deckJogador = [];
const maxDeckSlots = 6;
let deckDesbloqueado = false;

function syncUpgradeButton() {
    const btn = document.getElementById("toggle-upgrades");
    const upgradeMenu = document.getElementById("upgrade-menu");

    if (deckDesbloqueado) {
        btn.classList.remove("locked");   // habilitado
        // Mantém o menu FECHADO até o jogador clicar:
        upgradeMenu.classList.add("hidden");
    } else {
        btn.classList.add("locked");      // desabilitado visualmente
        upgradeMenu.classList.add("hidden"); // garante fechado quando bloqueado
    }
}

function syncDeckVisibility() {
    const deckEl = document.getElementById("deck-container");
    if (!deckEl) return;

    if (deckDesbloqueado) {
        deckEl.classList.remove("hidden-grid"); // mostra deck
    } else {
        deckEl.classList.add("hidden-grid"); // esconde deck
    }
}

function syncUIFromState() {
    syncUpgradeButton();
    syncDeckVisibility();
}

function checarDesbloqueioDeck() {

    if (!deckDesbloqueado && player.bananas >= 2) {
        deckDesbloqueado = true;
        addNewsletter("Parabéns! Você desbloqueou seu deck de macaicos. Compre seu primeiro amigo primata!")

        syncUIFromState();
        renderDeck();
        renderUpgrades();
        saveGame();
    }

}

// ======= Loja de pacotes ======

const shopCategories = {
    common: {
        cost: 100,
        macaicos: [
            "Macaico da Selva",
            "Macaico Bombado",
            "Macaico Mineiro"
        ]
    },
    rare: {
        cost: 1000,
        macaicos: [
            "Macaico Lutador",
            "Macaico Falante"
        ]
    }
    // épico, lendário, etc depois
};

// ======= Loja de pacotes ======
function renderStoreCategories() {
    const container = document.getElementById('store-categories');
    container.innerHTML = '';

    Object.entries(shopCategories).forEach(([key, cat]) => {
        const card = document.createElement('div');
        card.classList.add('store-card');
        card.innerHTML = `
            <h3>${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p>Custo: ${cat.cost} bananas</p>
            <button>Comprar pacote</button>
        `;

        container.appendChild(card);

        card.querySelector('button').addEventListener('click', () => {
            buyPack(key); // chama a função de compra com a raridade
            updateBananaDisplay(); // atualiza bananas
        });
    });
}

// Abrir/fechar loja
document.addEventListener('DOMContentLoaded', () => {
    const toggleStoreBtn = document.getElementById('toggle-store');
    const storeMenu = document.getElementById('store-menu');
    const closeStoreBtn = document.getElementById('close-store');

    toggleStoreBtn.addEventListener('click', () => {
        storeMenu.classList.remove('hidden');
        renderStoreCategories(); // renderiza os pacotes
    });

    closeStoreBtn.addEventListener('click', () => {
        storeMenu.classList.add('hidden');
    });

    // Todos os outros listeners que dependem do DOM também podem ficar aqui
});


function buyPack(rarity) {
    const pack = shopCategories[rarity];
    if (!pack) return;

    if (player.bananas < pack.cost) {
        addNewsletter("Bananas insuficientes!", "normal");
        return;
    }

    player.bananas -= pack.cost;

    // Sorteia um macaico da categoria
    const randomIndex = Math.floor(Math.random() * pack.macaicos.length);
    const macaico = pack.macaicos[randomIndex];

    // Adiciona ao deck
    if (!player.deck[macaico]) {
        player.deck[macaico] = 1;
        addNewsletter(`Novo macaico obtido: ${macaico}!`, "normal");
    } else {
        player.deck[macaico]++;
        addNewsletter(`${macaico} já estava no deck! Contador aumentado para ${player.deck[macaico]}.`, "funny");
    }

    // Aqui você pode exibir uma animação de "carta revelada"
    showCardReveal(macaico);
}

function showCardReveal(macaico) {
    const popupContainer = document.getElementById("popup-container");

    const card = document.createElement("div");
    card.classList.add("card-popup");
    card.innerHTML = `
        <h3>${macaico}</h3>
        <p>Adicionado ao deck!</p>
        <button onclick="this.parentElement.remove()">Fechar</button>
    `;

    popupContainer.appendChild(card);
}



// ======= Descrição dos Macaicos ======

const macaicoDescriptions = {
    "Macaico da Selva": "Macaico comum",
    "Macaico Bombado": "Consegue transportar mais bananas do que um Macaico comum.",
    "Macaico Mineiro": "Trabalha nas minas de Banana em busca de bananas de ouro.",
    "Macaico Lutador": "Luta em ringues de alto desempenho para ganhar um monte de bananas.",
    "Macaico Falante": "Diferente de todos os outros. Sua primeira palavra foi 'NÃO'",
    "Macaico Trader": "Vê gráficos subir e descer. Sabe a hora certa de comprar bananas, fazendo assim um lucro bem alto.",
    "Macaico Cientista": "Faz experimentos a nível molecular para descobrir como tirar o melhor das bananas.",
    "Macaico Místico": "Não se sabe ao certo de onde ele surgiu e nem como ele consegue bananas. Mas hora ou outra ele sempre aparece com uma quantidade Exorbitante de bananas."
}

// ======= Newsletter =======
const funnyQueue = [];
let funnyRunning = false;

function addNewsletter(message, type = "normal") {
    if (type === "funny") {
        funnyQueue.push(message);
        runFunnyNews();
    } else {
        // Popup normal
        const popupContainer = document.getElementById("popup-container");
        const popup = document.createElement("div");
        popup.classList.add("popup");

        const closeBtn = document.createElement("button");
        closeBtn.textContent = "×";
        closeBtn.onclick = () => popup.remove();

        popup.textContent = message;
        popup.appendChild(closeBtn);
        popupContainer.appendChild(popup);

        // Fecha sozinho depois de 5s (opcional)
        setTimeout(() => {
            if (popup.parentElement) popup.remove();
        }, 5000);
    }
}

function runFunnyNews() {
    if (funnyRunning || funnyQueue.length === 0) return;

    funnyRunning = true;
    const funnyNews = document.getElementById("funny-news");

    const span = document.createElement("span");
    span.textContent = funnyQueue.shift();
    funnyNews.innerHTML = "";
    funnyNews.appendChild(span);

    // Espera terminar a animação antes de liberar a próxima
    span.addEventListener("animationend", () => {
        funnyRunning = false;
        runFunnyNews(); // chama a próxima da fila
    });
}


function renderNewsletter() {
    const container = document.getElementById('menu-newsletter');
    if (!container) return;
    container.innerHTML = '';
    newsletterQueue.slice(-5).forEach(msg => {
        const el = document.createElement('div');
        el.textContent = msg;
        container.appendChild(el);
    });
}


// ======= Classe Upgrade =======
class Upgrade {
    constructor(name, bps, cost, baseEffect, spectialThresholds = []) {
        this.name = name;
        this.bps = bps;
        this.amount = 0;
        this.baseCost = cost;
        this.cost = cost;
        this.baseEffect = baseEffect;
        this.description = macaicoDescriptions[name];
        this.spectialThresholds = spectialThresholds

    }

    getCurrentBPS() {
        return this.bps * this.amount;
    };

    getDescription() {
        return this.description;
    };

    buy(player) {
        if (player.bananas >= this.cost) {
            player.bananas -= this.cost;
            this.amount++;
            player.clickMultiplier += this.baseEffect

            if (deckDesbloqueado) {
                adicionarMacaicoAodeck(this);
            }
            this.cost = Math.floor(this.baseCost * Math.pow(1.3, this.amount));
            this.checkTresholds();
            saveGame();
            return true;
        }

        return false;
    };

    checkTresholds() {
        this.spectialThresholds.forEach(th => {
            if (this.amount >= th.value && !th.triggered) {
                th.triggered = true
                th.action()
            }
        })
    }
}


const upgrades = [
    //(name, bps, cost, baseEffect)
    new Upgrade("Macaico da Selva", 1, 10, 1, [{ value: 1, triggered: false, action: () => addNewsletter("Você desbloqueou um macaico novo!", "normal") }]),
    new Upgrade("Macaico Bombado", 50, 100, 5),
    new Upgrade("Macaico Mineiro", 100, 1500, 10, [{ value: 1, triggered: false, action: () => addNewsletter("Minas desbloqueado! Agora é possível minerar Bananas Douradas.") }]),
    new Upgrade("Macaico Lutador", 250, 10000, 25),
    new Upgrade("Macaico Falante", 700, 100000, 70),
    new Upgrade("Macaico Trader", 1500, 1000000, 150),
    new Upgrade("Macaico Cientista", 3000, 50000000, 300, [{ value: 50, triggered: false, action: () => addNewsletter("Laboratório desbloqueado! Pesquisas de bananas disponíveis.") }]),
    new Upgrade("Macaico Místico", 10000, 1000000000, 1000),
]

// ======= Pesquisa de Bananas =======
class BananaResearch {
    constructor(name, duration, onComplete) {
        this.name = name;
        this.timer = 0
        this.onComplete = onComplete
        this.active = false
    }

    start() {
        this.active = true
        this.timer = 0
    }

    tick() {
        if (!this.active) return
        this.timer++
        if (this.timer >= this.duration) {
            this.active = false;
            this.onComplete()
            addNewsletter(`Pesquisa "${this.name}" concluída!`)
        }
    }
}

const researches = []


// ======= Funções de UI e utilitários=======

function formatNumber(num) {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
}

// Função genérica para criar cards
function createCard({ title, lines, description, buttonText, buttonAction }) {
    const card = document.createElement('div');
    card.classList.add('upgrade-card');

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('upgrade-info');

    lines.forEach(line => {
        const el = document.createElement('div');
        el.textContent = line;
        infoDiv.appendChild(el);
    });

    const descDiv = document.createElement('div');
    descDiv.classList.add('upgrade-description');
    descDiv.textContent = description;

    const btn = document.createElement('button');
    btn.textContent = buttonText;
    btn.addEventListener('click', buttonAction);

    card.appendChild(infoDiv);
    card.appendChild(descDiv);
    card.appendChild(btn);

    return card;
}

function updateBananaDisplay() {
    document.getElementById('banana-count').textContent = formatNumber(player.bananas);

    let totalBPS = upgrades.reduce((sum, u) => sum + u.getCurrentBPS(), 0);

    const cpsInfo = document.getElementById("cps-info")
    const bpsInfo = document.getElementById("bps-info")

    if (cpsInfo && bpsInfo) {
        cpsInfo.textContent = `+${formatNumber(player.clickMultiplier)} por clique`;
        bpsInfo.textContent = `+${formatNumber(totalBPS)} por segundo`;
    }

}

function renderUpgrades() {
    const menu = document.getElementById('upgrade-menu');
    menu.innerHTML = '';

    upgrades.forEach(upg => {
        const lines = [
            `Nome: ${upg.name}`,
            `Comprado: ${upg.amount}`,
            `Custo: ${formatNumber(upg.cost)}`,
            `Coleta: ${formatNumber(upg.getCurrentBPS())} bananas/segundo`
        ];

        const card = createCard({
            title: upg.name,
            lines: lines,
            description: upg.description,
            buttonText: 'Comprar',
            buttonAction: () => {
                if (upg.buy(player)) {
                    updateBananaDisplay();
                    renderUpgrades();
                    saveGame();
                }
            }
        });



        // Desabilitar botão se não houver bananas suficientes
        if (player.bananas < upg.cost) card.querySelector('button').disabled = true;

        menu.appendChild(card);
    });
}


// ======= Funcões do Deck =======

function renderDeck() {
    const container = document.getElementById("deck-container");
    if (!container) return;

    container.innerHTML = "";
    for (let i = 0; i < maxDeckSlots; i++) {
        const slot = document.createElement("div");
        slot.classList.add("deck-slot");

        const macaico = deckJogador[i];
        if (macaico) {
            slot.textContent = `${macaico.name} (${macaico.raridade})`;
        } else {
            slot.textContent = "Vazio";
        }

        container.appendChild(slot);
    }
}

function adicionarMacaicoAodeck(macaico) {
    if (deckJogador.length < maxDeckSlots) {
        deckJogador.push(macaico);
    } else {
        addNewsletter("O deck está cheio! Não é possível adicionar mais macaicos.");
    }
    renderDeck();
}


// ====== Auto coleta ======

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


// ======= Local Storage =======
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

// ======= Eventos de Click=======
const bananaEl = document.getElementById('banana');
bananaEl.addEventListener('click', () => {
    player.bananas += player.clickMultiplier;
    updateBananaDisplay();
    renderUpgrades();
    checarDesbloqueioDeck();
});

// ======= Toggle menus ========

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

// ======= Inicialização =======
loadGame();
syncUIFromState();
updateBananaDisplay();
renderUpgrades();
setInterval(autoCollect, 1000); // coleta automática
setInterval(saveGame, 5000); // salvar a cada 5 segundos
