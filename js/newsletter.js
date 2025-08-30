export const newsletterQueue = [];
const funnyQueue = [];
let funnyRunning = false;

export function addNewsletter(message, type = "normal") {
    const popupContainer = document.getElementById("popup-container");
    if (!popupContainer) return;

    if (type === "funny") {
        funnyQueue.push(message);
        runFunnyNews();
        return;
    }

    const popup = document.createElement("div");
    popup.classList.add("popup");
    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.onclick = () => popup.remove();
    popup.textContent = message;
    popup.appendChild(closeBtn);
    popupContainer.appendChild(popup);
    setTimeout(() => { if (popup.parentElement) popup.remove(); }, 5000);
}

function runFunnyNews() {
    if (funnyRunning || funnyQueue.length === 0) return;

    funnyRunning = true;
    const funnyNews = document.getElementById("funny-news");
    const span = document.createElement("span");
    span.textContent = funnyQueue.shift();
    funnyNews.innerHTML = "";
    funnyNews.appendChild(span);
    span.addEventListener("animationend", () => { funnyRunning = false; runFunnyNews(); });
}

function renderNewsletter() { const container = document.getElementById('menu-newsletter'); if (!container) return; container.innerHTML = ''; newsletterQueue.slice(-5).forEach(msg => { const el = document.createElement('div'); el.textContent = msg; container.appendChild(el); }); }
