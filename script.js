// Define the deck of cards
const suits = ["spades", "hearts", "clubs", "diamonds"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const deck = [];
for (let suit of suits) {
  for (let rank of ranks) {
    deck.push({ suit, rank });
  }
}

// Shuffle the deck
shuffleDeck(deck);

// Deal initial hand to the player
const playerHand = deck.splice(0, 13);

// Display player's hand
const handCards = document.getElementById("hand-cards");
playerHand.forEach(card => {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.textContent = `${card.rank} ${getSuitSymbol(card.suit)}`;
  handCards.appendChild(cardElement);
});

// Enable play button when a card is clicked
const playButton = document.getElementById("play-button");
handCards.addEventListener("click", event => {
  const selectedCard = event.target;
  if (selectedCard.classList.contains("card")) {
    selectedCard.classList.toggle("selected");
    playButton.disabled = handCards.querySelectorAll(".selected").length === 0;
  }
});

// Play selected cards to the table
playButton.addEventListener("click", () => {
  const selectedCards = handCards.querySelectorAll(".selected");
  selectedCards.forEach(card => {
    const clonedCard = card.cloneNode(true);
    card.remove();
    document.getElementById("played-cards").appendChild(clonedCard);
  });
  playButton.disabled = true;
});

// Function to shuffle the deck using Fisher-Yates algorithm
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to get the corresponding suit symbol
function getSuitSymbol(suit) {
  switch (suit) {
    case "spades":
      return "♠";
    case "hearts":
      return "♥";
    case "clubs":
      return "♣";
    case "diamonds":
      return "♦";
    default:
      return "";
  }
}
    