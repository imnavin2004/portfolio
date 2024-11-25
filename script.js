const gameBoard = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

const icons = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝'];
let cards = [...icons, ...icons]; // Duplicate icons to create pairs
let flippedCards = [];
let matchedCards = 0;

// Shuffle the cards using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Create and display the cards
function createBoard() {
  shuffle(cards);
  gameBoard.innerHTML = '';
  cards.forEach((icon) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

// Handle card click events
function handleCardClick(e) {
  const clickedCard = e.target;

  // Ignore clicks on already flipped or matched cards
  if (clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

  // Flip the card
  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.dataset.icon;

  flippedCards.push(clickedCard);

  // Check for a match if two cards are flipped
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check if the flipped cards are a match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.icon === card2.dataset.icon) {
    // It's a match
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 2;

    // Check if all cards are matched
    if (matchedCards === cards.length) {
      setTimeout(() => alert('🎉 You matched all the pairs!'), 500);
    }
  } else {
    // Not a match, flip them back
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
    }, 1000);
  }

  // Clear the flipped cards array
  flippedCards = [];
}

// Restart the game
restartButton.addEventListener('click', () => {
  matchedCards = 0;
  flippedCards = [];
  createBoard();
});

// Initialize the game
createBoard();
