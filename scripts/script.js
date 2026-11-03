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
import { drawButton } from "./rules.js";



updateDiscardPile();


console.log(`Start amount of cards: ${cards.length}`);