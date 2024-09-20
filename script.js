const cardsArray = [
  { type: 'word', name: 'banana', content: 'banana' },
  { type: 'image', name: 'banana', content: '🍌' },
  { type: 'word', name: 'apple', content: 'apple' },
  { type: 'image', name: 'apple', content: '🍎' },
  { type: 'word', name: 'grape', content: 'grape' },
  { type: 'image', name: 'grape', content: '🍇' },
  { type: 'word', name: 'lemon', content: 'lemon' },
  { type: 'image', name: 'lemon', content: '🍋' }
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
  
