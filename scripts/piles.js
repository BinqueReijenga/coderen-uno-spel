import { discardedCards } from "./cards.js";


const cardsContainer = document.querySelector("#cards");

cardsContainer.style.position = "fixed";
cardsContainer.style.bottom = "20px";
cardsContainer.style.left = "50%";
cardsContainer.style.transform = "translateX(-50%)";


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

export{updateDiscardPile};