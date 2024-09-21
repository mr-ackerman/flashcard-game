const cardsArray = [
  { type: 'word', name: 'banana', content: 'banana' },
  { type: 'image', name: 'banana', content: '<img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" alt="banana">' },
  { type: 'word', name: 'apple', content: 'apple' },
  { type: 'image', name: 'apple', content: '<img src="https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" alt="apple">' },
  { type: 'word', name: 'grape', content: 'grape' },
  { type: 'image', name: 'grape', content: '<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Table_grapes_on_white.jpg" alt="grape">' },
  { type: 'word', name: 'lemon', content: 'lemon' },
  { type: 'image', name: 'lemon', content: '<img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Lemon.jpg" alt="lemon">' }
];

let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;

// Load sound file
const matchSound = new Audio('match-sound.mp3');

function createBoard() {
  const gameBoard = document.getElementById('game-board');
  cardsArray.sort(() => 0.5 - Math.random()); // Shuffle cards

  cardsArray.forEach(cardData => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = cardData.name;

    if (cardData.type === 'word') {
      card.innerHTML = `
        <div class="front">${cardData.content}</div>
        <div class="back"></div>
      `;
    } else if (cardData.type === 'image') {
      card.innerHTML = `
        <div class="front">${cardData.content}</div>
        <div class="back"></div>
      `;
    }

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
  if (isMatch) {
    // Play sound if the pair is matched
    matchSound.play();
    disableCards();
  } else {
    unflipCards();
  }
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
