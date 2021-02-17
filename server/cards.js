import _ from "lodash";


let deckI = [
    "0R", "1R", "2R", "3R", "4R", "5R", "6R", "7R", "8R", "9R",
    "0B", "1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B", "9B",
    "0Y", "1Y", "2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y", "9Y",
    "0G", "1G", "2G", "3G", "4G", "5G", "6G", "7G", "8G", "9G",
    "1r", "2r", "3r", "4r", "5r", "6r", "7r", "8r", "9r",
    "1b", "2b", "3b", "4b", "5b", "6b", "7b", "8b", "9b",
    "1y", "2y", "3y", "4y", "5y", "6y", "7y", "8y", "9y",
    "1g", "2g", "3g", "4g", "5g", "6g", "7g", "8g", "9g",
]

/* Acá creamos mazos de 7 cartas */
let deck1 = _.sampleSize(deckI, 7);
let deckR = _.difference(deckI, deck1);
let deck2 = _.sampleSize(deckR, 7);
deckR = _.difference(deckR, deck2);
let deck3 = _.sampleSize(deckR, 7);
deckR = _.difference(deckR, deck3);
let deck4 = _.sampleSize(deckR, 7);
deckR = _.difference(deckR, deck4);

let cardsTaken = 3;

let cardsSended = _.sampleSize(deckR, cardsTaken);
deckR = _.difference(deckR, cardsSended);

const erradicate = () => {
    let cardsTaken2 = 5;
    let cardsSended3 = _.sampleSize(deckR, cardsTaken2);
    deckR = _.difference(deckR, cardsSended3);
    console.log(deckR)
    return cardsSended3

};






export { erradicate, deck1, deck2, deck3, deck4 }

