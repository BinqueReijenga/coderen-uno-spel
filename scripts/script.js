import {cards, playedCards, player1Cards, player2Cards, getAndRemoveRandomCard } from "./cards.js";

const cardsContainer = document.querySelector("#cards");
const drawButton = document.querySelector("#drawCard");

drawButton.addEventListener("click", () => {
    const randomCard = getAndRemoveRandomCard(cards);

    const player1card = document.createElement("img");

    player1card.src = `cards/${randomCard}.png`;
    player1card.alt = randomCard;

    player1card.addEventListener("click", () => {
    console.log(`You clicked: ${randomCard}`);
});

    const cardNumber = cardsContainer.children.length;
    player1card.style.left = `${cardNumber * 20}px`;

    cardsContainer.appendChild(player1card);
    cardsContainer.appendChild(player1card);

    console.log(`chosen card: ${randomCard}`);
    console.log(`Cards left: ${cards.length}`);
    player1Cards.push(randomCard);
    console.log(player1Cards);
});

console.log(`Start amount of cards: ${cards.length}`);