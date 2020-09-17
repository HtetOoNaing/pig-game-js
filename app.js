/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

let diceDOM = document.querySelector(".dice");
diceDOM.style.display = "none";

document.getElementById("score-0").textContent = "0";
document.getElementById("score-1").textContent = "0";
document.getElementById("current-0").textContent = "0";
document.getElementById("current-1").textContent = "0";

document.querySelector(".btn-roll").addEventListener("click", () => {
  // 1. Random number
  let dice = Math.ceil(Math.random() * 6);
  // 2. Display the result
  diceDOM.style.display = "block";
  diceDOM.src = "dice-" + dice + ".png";
  // 3. Update the round score if the roll number was not 1
  if (dice !== 1) {
    // Add Score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    // Next Player
    nexPlayer();
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  // Add current score to global score
  scores[activePlayer] += roundScore;

  // Update the UI
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // Check if the player won the game
  if (scores[activePlayer] >= 100) {
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    diceDOM.style.display = "none";
    document
      .querySelector(".player-" + activePlayer + "-pannel")
      .classList.add("winner");
    document
      .querySelector(".player-" + activePlayer + "-pannel")
      .classList.remove("active");
  } else {
    nexPlayer();
  }
});

function nexPlayer() {
  // Next Player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  diceDOM.style.display = "none";
}
