import { updateDiscardPile } from "./piles.js";


const cards = [];
cards.push(
    // Red cards
    ...Array(1).fill("Red_0"),
    ...Array(2).fill("Red_1"),
    ...Array(2).fill("Red_2"),
    ...Array(2).fill("Red_3"),
    ...Array(2).fill("Red_4"),
    ...Array(2).fill("Red_5"),
    ...Array(2).fill("Red_6"),
    ...Array(2).fill("Red_7"),
    ...Array(2).fill("Red_8"),
    ...Array(2).fill("Red_9"),
    ...Array(2).fill("Red_Skip"),
    ...Array(2).fill("Red_Reverse"),
    ...Array(2).fill("Red_Draw_2"),

    // Blue cards
    ...Array(1).fill("Blue_0"),
    ...Array(2).fill("Blue_1"),
    ...Array(2).fill("Blue_2"),
    ...Array(2).fill("Blue_3"),
    ...Array(2).fill("Blue_4"),
    ...Array(2).fill("Blue_5"),
    ...Array(2).fill("Blue_6"),
    ...Array(2).fill("Blue_7"),
    ...Array(2).fill("Blue_8"),
    ...Array(2).fill("Blue_9"),
    ...Array(2).fill("Blue_Skip"),
    ...Array(2).fill("Blue_Reverse"),
    ...Array(2).fill("Blue_Draw_2"),

    // Yellow cards
    ...Array(1).fill("Yellow_0"),
    ...Array(2).fill("Yellow_1"),
    ...Array(2).fill("Yellow_2"),
    ...Array(2).fill("Yellow_3"),
    ...Array(2).fill("Yellow_4"),
    ...Array(2).fill("Yellow_5"),
    ...Array(2).fill("Yellow_6"),
    ...Array(2).fill("Yellow_7"),
    ...Array(2).fill("Yellow_8"),
    ...Array(2).fill("Yellow_9"),
    ...Array(2).fill("Yellow_Skip"),
    ...Array(2).fill("Yellow_Reverse"),
    ...Array(2).fill("Yellow_Draw_2"),

    // Green cards
    ...Array(1).fill("Green_0"),
    ...Array(2).fill("Green_1"),
    ...Array(2).fill("Green_2"),
    ...Array(2).fill("Green_3"),
    ...Array(2).fill("Green_4"),
    ...Array(2).fill("Green_5"),
    ...Array(2).fill("Green_6"),
    ...Array(2).fill("Green_7"),
    ...Array(2).fill("Green_8"),
    ...Array(2).fill("Green_9"),
    ...Array(2).fill("Green_Skip"),
    ...Array(2).fill("Green_Reverse"),
    ...Array(2).fill("Green_Draw_2"),

    // Other cards
    ...Array(4).fill("Wild_Card_Change_Colour"),
    ...Array(4).fill("Wild_Card_Draw_4")
);

export const player1Cards = [];
export const player2Cards = [];
export const discardedCards = [];


function getAndRemoveRandomCard(cards) {
    if(cards.length == 0){
    alert("There are no more cards left!");
    return;
    }
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards.splice(randomIndex, 1)[0];
    return randomCard;
}


const cardsContainer = document.querySelector("#cards");
export const drawButton = document.querySelector("#drawCard");




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
            card.style.marginLeft = index === 0 ? "0px" : `-${overlap}px`;
            row.appendChild(card);
        });

        cardsContainer.appendChild(row);
    });
}


window.addEventListener("resize", updateCards);


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
        discardedCards.push(`cards/${randomCard}.png`);
        const index = player1Cards.indexOf(randomCard);
        if (index !== -1) {
            player1Cards.splice(index, 1);
        }

        player1card.remove();
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

export{cards, updateCards, getAndRemoveRandomCard};