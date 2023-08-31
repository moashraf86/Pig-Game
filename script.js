'use strict';

// 1. Select Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const name0El = document.querySelector('#name--0');
const name1El = document.querySelector('#name--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  // 2. Generate a random Number from [1-6]
  const randomDice = Math.trunc(Math.random() * 6) + 1;

  // 3. change dice image to depending on the randomDice
  diceEl.src = `img/dice-${randomDice}.png`;

  // 4. Display dice
  diceEl.classList.remove('hidden');

  // 5. Check if dice roll is 1 and if so, switch player and reset current score
  if (randomDice !== 1) {
    // add the dice to the current score
    currentScore += randomDice;
    // display the current score
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //reset the current Score
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    // switch player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Add active class to active player and remove from inactive player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});

// Hold Functionality
btnHold.addEventListener('click', function () {
  // 1. add the current score to total score
  scores[activePlayer] += currentScore;
  // 2. display the total score
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // 3. reset the current Score
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  // 4. if total score >= 100 ->> player wins
  if (scores[activePlayer] >= 100) {
    // hide the dice
    diceEl.classList.add('hidden');
    // set the winner total score to 100
    document.getElementById(`score--${activePlayer}`).textContent = 100;
    // add the winner class to the active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    // remove the active class from the active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    // disable the roll  and hold dice button
    btnRoll.disabled = true;
    btnHold.disabled = true;
    // change the active player name to winner
    document.getElementById(`name--${activePlayer}`).textContent =
      '🏆 Winner 🏆';
  } else {
    // 3. switch player
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Add active class to active player and remove from inactive player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});

// New Game Functionality
btnNew.addEventListener('click', function () {
  // reset scores
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // reset the total score
  score0El.textContent = 0;
  score1El.textContent = 0;
  // hide the dice
  diceEl.classList.add('hidden');
  // remove the winner class from the active player
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  // add the active class to player 1
  player0El.classList.add('player--active');
  // change the active player name to player 1
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
  // enable the roll and hold dice button
  btnRoll.disabled = false;
  btnHold.disabled = false;
});
