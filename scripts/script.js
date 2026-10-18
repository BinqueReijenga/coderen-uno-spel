import {
    cards,
    discardedCards,
    player1Cards,
    player2Cards,
    getAndRemoveRandomCard,
    updateCards,
    drawButton
} from "./cards.js";
import {
    updateDiscardPile
} from "./piles.js";


updateDiscardPile();
console.log(`Start amount of cards: ${cards.length}`);