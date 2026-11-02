import { discardedCards, getAndRemoveRandomCard, cards, player1Cards, player2Cards, cardsContainer, cardsContainer2, updateCards } from "./cards.js";
import { updateDiscardPile } from "./piles.js";

export const drawButton = document.querySelector("#drawCard");

const VALID_COLORS = ["red", "blue", "green", "yellow"];

const hands = { 1: player1Cards, 2: player2Cards };
const containers = { 1: cardsContainer, 2: cardsContainer2 };

let currentPlayer = 1;
let currentColor = null;
let pendingDraw = 0; 

export function getLastCard() {
    return discardedCards[discardedCards.length - 1];
}

function otherPlayer(player) {
    return player === 1 ? 2 : 1;
}

// Banner die laat zien wie er aan de beurt is
const turnInfo = document.createElement("div");
turnInfo.id = "turnInfo";
document.body.appendChild(turnInfo);

function updateTurnIndicator() {
    turnInfo.textContent = `Speler ${currentPlayer} is aan de beurt`;
    if (pendingDraw > 0) {
        turnInfo.textContent += ` - pak ${pendingDraw} kaarten of speel een +2/+4`;
    }
    turnInfo.className = `player${currentPlayer}`;
    containers[1].classList.toggle("active", currentPlayer === 1);
    containers[2].classList.toggle("active", currentPlayer === 2);
}

function nextTurn() {
    currentPlayer = otherPlayer(currentPlayer);
    console.log(`Speler ${currentPlayer} is aan de beurt`);
    updateTurnIndicator();
}


function parseCard(card) {
    const name = card.replace("cards/", "").replace(".png", "").toLowerCase();
    const [color, ...rest] = name.split("_");
    return { color, value: rest.join("_") };
}

function isDrawCard(card) {
    const { value } = parseCard(card);
    return value === "draw_2" || value === "card_draw_4";
}

function canPlay(card) {
    if (pendingDraw > 0) return isDrawCard(card);

    const last = getLastCard();
    if (!last) return true;

    const top = parseCard(last);
    const played = parseCard(card);

    if (played.color === "wild") return true;

    const activeColor = currentColor ?? top.color;
    return played.color === activeColor || played.value === top.value;
}

function chooseColor() {
    while (true) {
        const choice = prompt("Kies een kleur: red, blue, green, yellow");
        if (choice === null) return null;
        const color = choice.trim().toLowerCase();
        if (VALID_COLORS.includes(color)) return color;
    }
}

function drawCardFor(player) {
    const randomCard = getAndRemoveRandomCard(cards);
    if (!randomCard) {
        console.log("Geen kaarten meer!");
        return false;
    }

    const img = document.createElement("img");
    img.src = `cards/${randomCard}.png`;
    img.alt = randomCard;
    img.addEventListener("click", () => playCard(randomCard, img, player));

    containers[player].appendChild(img);
    hands[player].push(randomCard);
    return true;
}

function playCard(randomCard, cardElement, player) {
    if (player !== currentPlayer) {
        console.log("Niet jouw beurt!");
        return;
    }
    if (!canPlay(randomCard)) {
        console.log("Deze kaart mag niet!");
        return;
    }

    const played = parseCard(randomCard);

    if (played.color === "wild") {
        const chosen = chooseColor();
        if (!chosen) return;
        currentColor = chosen;
    } else {
        currentColor = played.color;
    }

    console.log(`Speler ${player} speelt: ${randomCard}`);
    discardedCards.push(`cards/${randomCard}.png`);

    const hand = hands[player];
    const index = hand.indexOf(randomCard);
    if (index !== -1) hand.splice(index, 1);

    cardElement.remove();

    let keepTurn = false;

    if (played.value === "skip" || played.value === "reverse") {
        keepTurn = true;
    } else if (played.value === "draw_2") {
        pendingDraw += 2; 
    } else if (played.value === "card_draw_4") {
        pendingDraw += 4;
    }

    updateCards();
    updateDiscardPile();

    if (hand.length === 0) {
        alert(`Speler ${player} heeft gewonnen!`);
        return;
    }

    if (!keepTurn) nextTurn();
}


drawButton.addEventListener("click", () => {
    if (pendingDraw > 0) {
        for (let i = 0; i < pendingDraw; i++) drawCardFor(currentPlayer);
        pendingDraw = 0;
        updateCards();
        nextTurn();
        return;
    }
    if (hands[currentPlayer].some(canPlay)) {
        console.log("Je hebt al een kaart die mag, speel die!");
        return;
    }
    if (drawCardFor(currentPlayer)) {
        updateCards();
    }
});

// Begin van het spel: elke speler krijgt 8 kaarten
const START_CARDS = 8;
for (let i = 0; i < START_CARDS; i++) {
    drawCardFor(1);
    drawCardFor(2);
}
updateCards();
updateTurnIndicator();