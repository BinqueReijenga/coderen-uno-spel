import {
    cards,
    discardedCards,
    player1Cards,
    player2Cards,
    updateCards
} from "./cards.js";
import {
    updateDiscardPile
} from "./piles.js";
import {
    drawButton,
    getLastCard
} from "./rules.js";



updateDiscardPile();

// getLastCard();
// console.log("lastcard: " + getLastCard());

console.log(`Start amount of cards: ${cards.length}`);