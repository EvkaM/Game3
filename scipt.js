const images = [
    '👧', '🧑', '👱‍♀️', '👱‍♂️', '👩‍🦰', '👨‍🦰', '👴', '👵'
];

let cards = [...images, ...images];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(emoji, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<span style="display: none; font-size: 50px;">${emoji}</span>`;
    card.dataset.index = index;
    card.dataset.emoji = emoji;

    card.addEventListener('click', () => flipCard(card));
    return card;
}

function flipCard(card) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;

    card.classList.add('flipped');
    card.querySelector('span').style.display = 'block';
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matchedPairs++;
        document.getElementById('score').textContent = matchedPairs;
        
        if (matchedPairs === images.length) {
            alert('Շնորհավորում ենք! Դուք հաղթեցիք!');
            resetGame()
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.querySelector('span').style.display = 'none';
        card2.querySelector('span').style.display = 'none';
    }
    flippedCards = [];
}

function initGame() {
    const gameContainer = document.getElementById('gameContainer');
    shuffle(cards).forEach((emoji, index) => {
        gameContainer.appendChild(createCard(emoji, index));
    });
}

initGame();

function resetGame () {
    matchedPairs = 0;
    flippedCards = [];
    document.getElementById('score').textContent = matchedPairs;
    const gameContainer = document.getElementById('gameContainer')
    gameContainer.innerHTML = '';
    initGame()
}