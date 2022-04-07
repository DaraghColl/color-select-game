import './style.css';

// selectors
const app = document.querySelector('#app');
const scoreUI = document.querySelector('#score');
const currentColorUI: HTMLElement = document.querySelector('#current-color')!;
const startButton = document.querySelector('#start-game');

const balls: string[] = ['#ef4444', '#16a34a', '#2563eb', '#7e22ce'];
const ballsStartingPositions: string[] = [
  '5%',
  '20%',
  '35%',
  '50%',
  '65%',
  '80%',
];

let currentColor = '#16a34a';
let score = 0;

const createBall = () => {
  const ballColor = balls[Math.floor(Math.random() * balls.length)];
  const ballPoisition =
    ballsStartingPositions[
      Math.floor(Math.random() * ballsStartingPositions.length)
    ];

  const ball = document.createElement('div');

  ball.classList.add('ball');
  ball.style.right = ballPoisition;

  ball.style.backgroundColor = ballColor;

  app?.insertAdjacentElement('afterbegin', ball);

  setTimeout(() => {
    ball.classList.add('move-down');
  }, 700);

  setTimeout(() => {
    ball.remove();
  }, 4500);

  ball.addEventListener('click', () => {
    if (ballColor === currentColor) {
      score += 1;
      if (scoreUI) {
        ball.classList.add('ball-selected');

        scoreUI.innerHTML = score.toString();
      }
    } else {
      score -= 1;
      if (scoreUI) scoreUI.innerHTML = score.toString();
    }
  });
};

const selectCurrentColor = () => {
  currentColor = balls[Math.floor(Math.random() * balls.length)];
  currentColorUI.style.backgroundColor = currentColor;
};

const startGame = () => {
  const setBallColorinterval = setInterval(selectCurrentColor, 3000);

  const ballCreationinterval = setInterval(createBall, 500);

  document.querySelector('button')?.addEventListener('click', () => {
    clearInterval(ballCreationinterval);
    clearInterval(setBallColorinterval);
  });
};

startButton?.addEventListener('click', () => {
  startButton.remove();
  setTimeout(() => {
    startGame();
  }, 1000);
});

// startGame();
