import { cards, getAndRemoveRandomCard } from "./cards.js";

const cardsContainer = document.querySelector("#cards");
const drawButton = document.querySelector("#drawCard");

drawButton.addEventListener("click", () => {
    const randomCard = getAndRemoveRandomCard(cards);

    const img = document.createElement("img");

    img.src = `cards/${randomCard}.png`;
    img.alt = randomCard;

    cardsContainer.appendChild(img);

    console.log(`Getrokken kaart: ${randomCard}`);
    console.log(`Kaarten over: ${cards.length}`);
});

console.log(`Start aantal kaarten: ${cards.length}`);