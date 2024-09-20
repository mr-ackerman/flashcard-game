const cardsArray = [
  { name: 'apple', img: '🍎' },
  { name: 'banana', img: '🍌' },
  { name: 'grape', img: '🍇' },
  { name: 'lemon', img: '🍋' },
  { name: 'apple', img: '🍎' },
  { name: 'banana', img: '🍌' },
  { name: 'grape', img: '🍇' },
  { name: 'lemon', img: '🍋' }
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  cardsArray.sort(() => 0.5 - Math.random()); // Shuffle cards

  cardsArray.forEach(cardData => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = cardData.name;

    card.innerHTML = `
      <div class="front">${cardData.img}</div>
      <div class="back"></div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

createBoard();
