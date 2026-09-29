import {cards, getAndRemoveRandomCard} from "./cards.js";
const randomCard = getAndRemoveRandomCard(cards);
document.querySelector("#drawCard").addEventListener("click", () => {
    const randomCard = getAndRemoveRandomCard(cards);
    alert(`${randomCard}, ${cards.length}`);
});

console.log(cards.length);
