
export const newsletterQueue = [];
let funnyRunning = false;

export function addNewsletter(message, type = "normal") {
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

export function runFunnyNews() {
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


export function renderNewsletter() {
    const container = document.getElementById('menu-newsletter');
    if (!container) return;
    container.innerHTML = '';
    newsletterQueue.slice(-5).forEach(msg => {
        const el = document.createElement('div');
        el.textContent = msg;
        container.appendChild(el);
    });
}