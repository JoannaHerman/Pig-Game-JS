'use strict';

//SELECTING ELEMENTS
//querySelector & getElementById works the same (getElement faster)
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//SCOPING
let scores, currentScore, activePlayer, playing;

//INITIAL CONDITIONS
const init = function () {
  //STARTING CONDITIONS
  scores = [0, 0];
  currentScore = 0; //holds current score of current round
  activePlayer = 0; //it's 0 becouse its an array and first element is 0
  playing = true;

  // 1. restore initial background color of a winner
  //.player--winner background-color: #2f2f2f;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // 2. restore initial background color of active player
  //.player--active background-color: rgba(255, 255, 255, 0.4);
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // 3. restore score
  score0El.textContent = 0; //STARTING CONDITION
  score1El.textContent = 0; // STARTING CONDITION

  // 4. restore current score
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  diceEl.classList.add('hidden'); //classList.add - REMOVING hidden element;
};

init();

const switchPlayer = function () {
  currentScore = 0; //reseting score of activePlayer
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //reassigning activePlayer
  player0El.classList.toggle('player--active'); //changing backgroud of player when player changes
  player1El.classList.toggle('player--active'); //it is player-active becouse its included only in plater 0
};

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (playing) {
    // <-- //logic to stop playig when player wins the game
    //  1. GENERATING RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. DISPLAY DICE
    diceEl.classList.remove('hidden'); //defying what dice image should be displayed
    diceEl.src = `dice-${dice}.png`;
    // 3. CHECK FOR ROLLED 1:
    //IF DICE IS =/=  1 ADD DICE TO CURRENT SCORE
    if (dice !== 1) {
      currentScore += dice; //if currentScore is =/= 1 display current dice number
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //ELSE SWTCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});
//HOLDING CURRENT SCORE
btnHold.addEventListener('click', function () {
  if (playing) {
    // <-- //logic to stop playig when player wins the game
    // 1. ADD CURRENT SCORE TO ACTIVE PLAYER SCORE
    scores[activePlayer] += currentScore; // scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. CHECK IF PLAYER SCORE IS >= 100 --> FINISH THE GAME
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden'); // reseting dice image so it disappears
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. IELSE SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});
// RESETING THE GAME
// CHALLANGE #1
//when 'click' on new game button reset all the initial conditions of the game
btnNew.addEventListener('click', init);
