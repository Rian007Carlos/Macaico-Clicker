export function createCard({ title, lines, description, buttonText, buttonAction }) {
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