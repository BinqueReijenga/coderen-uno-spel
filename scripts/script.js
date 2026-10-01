import {
    cards,
    discardedCards,
    player1Cards,
    player2Cards,
    getAndRemoveRandomCard
} from "./cards.js";

const cardsContainer = document.querySelector("#cards");
const drawButton = document.querySelector("#drawCard");

cardsContainer.style.position = "fixed";
cardsContainer.style.bottom = "20px";
cardsContainer.style.left = "50%";
cardsContainer.style.transform = "translateX(-50%)";

function updateCards() {
    const cardElements = [...cardsContainer.querySelectorAll("img")];

    cardsContainer.innerHTML = "";

    const cardWidth = 144;
    const overlap = 30;
    const spacePerCard = cardWidth - overlap;
    const maxWidth = window.innerWidth - 40;

    let cardsPerRow = Math.floor(
        (maxWidth - overlap) / spacePerCard
    );

    if (cardsPerRow < 1) {
        cardsPerRow = 1;
    }

    const rows = [];

    for (let i = 0; i < cardElements.length; i += cardsPerRow) {
        rows.push(cardElements.slice(i, i + cardsPerRow));
    }

    cardsContainer.style.display = "flex";
    cardsContainer.style.flexDirection = "column";
    cardsContainer.style.alignItems = "center";
    cardsContainer.style.gap = "10px";

    rows.forEach(rowCards => {
        const row = document.createElement("div");

        row.style.display = "flex";
        row.style.justifyContent = "center";

        rowCards.forEach((card, index) => {
            card.style.width = `${cardWidth}px`;
            card.style.height = "215px";
            card.style.objectFit = "contain";
            card.style.marginLeft =
                index === 0 ? "0px" : `-${overlap}px`;

            row.appendChild(card);
        });

        cardsContainer.appendChild(row);
    });
}


drawButton.addEventListener("click", () => {
    const randomCard = getAndRemoveRandomCard(cards);

    if (!randomCard) {
        console.log("Geen kaarten meer!");
        return;
    }

    const player1card = document.createElement("img");

    player1card.src = `cards/${randomCard}.png`;
    player1card.alt = randomCard;

    player1card.addEventListener("click", () => {
        console.log(`You played: ${randomCard}`);

        // Voeg kaart toe aan discard pile
        discardedCards.push(`cards/${randomCard}.png`);

        // Verwijder kaart uit player1Cards
        const index = player1Cards.indexOf(randomCard);

        if (index !== -1) {
            player1Cards.splice(index, 1);
        }

        // Verwijder kaart uit beeld
        player1card.remove();

        // Update beide onderdelen
        updateCards();
        updateDiscardPile();

        console.log("Player 1 cards:", player1Cards);
        console.log("Discarded cards:", discardedCards);
    });

    cardsContainer.appendChild(player1card);

    player1Cards.push(randomCard);

    console.log(`Chosen card: ${randomCard}`);
    console.log(`Cards left: ${cards.length}`);
    console.log("Player 1 cards:", player1Cards);

    updateCards();
});


window.addEventListener("resize", updateCards);


// ====================
// DISCARD PILE
// ====================

function updateDiscardPile() {
    const discardPile = document.querySelector("#discardPile");

    if (!discardPile) {
        console.error("Element #discardPile bestaat niet!");
        return;
    }

    discardPile.innerHTML = "";

    const lastDiscardedCard = document.createElement("img");

    if (discardedCards.length === 0) {
        lastDiscardedCard.src = "cards/empty.png";
        lastDiscardedCard.alt = "Empty";
    } else {
        lastDiscardedCard.src =
            discardedCards[discardedCards.length - 1];

        lastDiscardedCard.alt = "Discarded card";
    }

    lastDiscardedCard.style.width = "144px";
    lastDiscardedCard.style.height = "215px";
    lastDiscardedCard.style.objectFit = "contain";

    discardPile.appendChild(lastDiscardedCard);
}


// Initialiseer discard pile
updateDiscardPile();

console.log(`Start amount of cards: ${cards.length}`);