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
const cardsContainer2 = document.querySelector("#cards2");


function layoutContainer(container) {
    const cardElements = [...container.querySelectorAll("img")];
    container.innerHTML = "";

    const maxCardWidth = 144;
    const cardHeightRatio = 215 / 144;
    const overlapRatio = 30 / 144;
    const minCardWidth = 30;
    const maxWidth = window.innerWidth - 40;
    const n = Math.max(cardElements.length, 1);

    const widthForOneRow = maxWidth / (1 + (n - 1) * (1 - overlapRatio));
    const cardWidth = Math.max(minCardWidth, Math.min(maxCardWidth, widthForOneRow));
    const overlap = cardWidth * overlapRatio;

    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";

    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "center";
    cardElements.forEach((card, index) => {
        card.style.width = `${cardWidth}px`;
        card.style.height = `${cardWidth * cardHeightRatio}px`;
        card.style.objectFit = "contain";
        card.style.marginLeft = index === 0 ? "0px" : `-${overlap}px`;
        row.appendChild(card);
    });
    container.appendChild(row);
}

// Tekent de kaarten van beide spelers opnieuw
function updateCards() {
    layoutContainer(cardsContainer);
    layoutContainer(cardsContainer2);
}


window.addEventListener("resize", updateCards);




export{cards, updateCards, getAndRemoveRandomCard, cardsContainer, cardsContainer2};