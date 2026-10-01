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
export const playedCards = [];


export function getAndRemoveRandomCard(cards) {
    if(cards.length == 0){
    alert("De kaarten zijn op!");
    return;
    }
    const randomIndex = Math.floor(Math.random() * cards.length);
    const randomCard = cards.splice(randomIndex, 1)[0];
    return randomCard;
}











export{cards};

