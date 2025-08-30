// Catálogo de Macaicos: metadados + utilitários

export const RARIDADE = {
    COMUM: "comum",
    RARO: "raro",
    EPICO: "épico",
    LENDARIO: "lendário",
};

// ======= Descrições (as mesmas que você já usa) =======
export const macaicoDescriptions = {
    "Macaico da Selva": "Macaico comum",
    "Macaico Bombado": "Consegue transportar mais bananas do que um Macaico comum.",
    "Macaico Mineiro": "Trabalha nas minas de Banana em busca de bananas de ouro.",
    "Macaico Lutador": "Luta em ringues de alto desempenho para ganhar um monte de bananas.",
    "Macaico Falante": "Diferente de todos os outros. Sua primeira palavra foi 'NÃO'",
    "Macaico Trader": "Vê gráficos subir e descer. Sabe a hora certa de comprar bananas, fazendo assim um lucro bem alto.",
    "Macaico Cientista": "Faz experimentos a nível molecular para descobrir como tirar o melhor das bananas.",
    "Macaico Místico": "Não se sabe ao certo de onde ele surgiu e nem como ele consegue bananas. Mas hora ou outra ele sempre aparece com uma quantidade Exorbitante de bananas."
};

// ======= Raridade por nome =======
// Observação: deixei "Macaico Mineiro" como COMUM porque no seu código ele aparece em `shopCategories.common`.
export const macaicoRarityByName = {
    "Macaico da Selva": RARIDADE.COMUM,
    "Macaico Bombado": RARIDADE.COMUM,
    "Macaico Mineiro": RARIDADE.COMUM,
    "Macaico Lutador": RARIDADE.RARO,
    "Macaico Falante": RARIDADE.RARO,
    "Macaico Trader": RARIDADE.EPICO,
    "Macaico Cientista": RARIDADE.EPICO,
    "Macaico Místico": RARIDADE.LENDARIO,
};

// ======= Helpers de metadado =======
export function getDescription(name) {
    return macaicoDescriptions[name] ?? "—";
}

export function getRarity(name) {
    return macaicoRarityByName[name] ?? RARIDADE.COMUM;
}

// Cria uma entrada de deck a partir do NOME
export function makeDeckEntryFromName(name) {
    return { name, raridade: getRarity(name) };
}

// Cria uma entrada de deck a partir do objeto Upgrade (usa o `name`)
export function makeDeckEntryFromUpgrade(upgradeObj) {
    return makeDeckEntryFromName(upgradeObj?.name);
}

// Listas por raridade (útil para montar a loja a partir do catálogo, se quiser)
export const macaicosPorRaridade = {
    common: Object.keys(macaicoRarityByName).filter(n => macaicoRarityByName[n] === RARIDADE.COMUM),
    rare: Object.keys(macaicoRarityByName).filter(n => macaicoRarityByName[n] === RARIDADE.RARO),
    epic: Object.keys(macaicoRarityByName).filter(n => macaicoRarityByName[n] === RARIDADE.EPICO),
    legendary: Object.keys(macaicoRarityByName).filter(n => macaicoRarityByName[n] === RARIDADE.LENDARIO),
};
