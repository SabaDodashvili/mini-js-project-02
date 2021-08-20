let themeCahngeBtn = document.querySelector('.theme-change');

themeCahngeBtn.addEventListener('click', toggleTheme);

function initialState(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme(params) {
  if (localStorage.getItem('theme') == 'dark-theme') {
    initialState('light-theme');
  } else {
    initialState('dark-theme');
  }
}

initialState('light-theme');
// ================================================ H A N G M A N ========================================================

window.onload = function () {
  let end = Date.now() + 1 * 1000;
  let colors = ['#12db12', '#e817ff', '#13dde8', '#fced17', '#ffa826'];
  let wordsArr = ['programming', 'landing', 'awkward', 'snake', 'interruption', 'bayou', 'galvanize', 'nowadays'];
  let randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  let wrongLetters = document.querySelector('.wrong-letters__board');
  let humanElements = document.querySelectorAll('.human-element');
  let repeatingPopup = document.querySelector('.repeating-symbol-popup');
  let gameEndPopup = document.querySelector('.game-end-popup');
  let playAgainBtn = document.querySelector('.game-end-popup__play-again-btn');
  let tryCounter = 0;
  let gameEnd = false;
  let letterInput = ``;
  let inputLetters = '';
  let buttonKey;
  let inputWordLettersArr;
  createInputLetters();

  document.addEventListener('keyup', (e) => {
    let regxp = /[a-z|A-Z]/;
    buttonKey = e.key.toLowerCase();

    if (inputLetters.indexOf(buttonKey) == -1 && buttonKey.length == 1 && !gameEnd && regxp.test(buttonKey)) {
      inputLetters += buttonKey;
      if (randomWord.indexOf(buttonKey) !== -1) {
        addCorrectLetter(e);
      } else if (wrongLetters.textContent.indexOf(buttonKey) == -1) {
        addWrongLetter();
      }
    } else if (inputLetters.indexOf(buttonKey) !== -1 && !gameEnd) {
      repeatingPopup.classList.add('active');
      setTimeout(changeRepeatingPopupStatus, 1500);
    }
  });

  playAgainBtn.addEventListener('click', restartGame);

  function addCorrectLetter() {
    let indexsArr = getListIdx(randomWord, buttonKey);

    for (let i = 0; i < inputWordLettersArr.length; i++) {
      for (let k = 0; k < indexsArr.length; k++) {
        if (indexsArr[k] === i) {
          inputWordLettersArr[i].textContent = buttonKey;
        }
      }
    }

    if (checkGuessLetters() === false) {
      doConfetti();
      setTimeout(changeGameEndPopupStatus('Congratulations! You won! 👍👍'), 700);
      gameEnd = true;
    }
  }

  function addWrongLetter() {
    wrongLetters.textContent += buttonKey + ', ';
    humanElements[tryCounter].style.display = 'block';
    tryCounter += 1;
    if (tryCounter === 6) {
      document.querySelector('.gibbet__head').innerHTML = `
				      <span class="gibbet-head__eye">
                <span></span>
                <span></span>
              </span>
              <span class="gibbet-head__eye">
                <span></span>
                <span></span>
              </span>
              <span class="gibbet-head__mouth"></span>
          <span class="gibbet-head__tongue"></span>`;
      setTimeout(changeGameEndPopupStatus('Sorry You Lose. 😢'), 700);
      gameEnd = true;
    }
  }

  function createInputLetters() {
    for (let i = 0; i < randomWord.length; i++) {
      letterInput += `<span class="input-word__letter"></span>`;
    }

    document.querySelector('.game-box__input-word').insertAdjacentHTML('afterbegin', letterInput);
    inputWordLettersArr = document.querySelectorAll('.input-word__letter');
  }

  function getListIdx(str, substr) {
    let listIdx = [];
    let lastIndex = -1;
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
      listIdx.push(lastIndex);
    }
    return listIdx;
  }

  function checkGuessLetters() {
    let notFilled = false;

    for (let i = 0; i < inputWordLettersArr.length; i++) {
      if (!inputWordLettersArr[i].textContent) {
        notFilled = true;
        break;
      }
    }

    return notFilled;
  }

  function changeRepeatingPopupStatus() {
    repeatingPopup.classList.remove('active');
  }

  function changeGameEndPopupStatus(string) {
    gameEndPopup.insertAdjacentHTML('afterbegin', `<div class="game-end-popup__win-lose-message">${string}</div>`);
    gameEndPopup.classList.add('open');
  }

  function doConfetti() {
    confetti({
      particleCount: 170,
      angle: 70,
      spread: 140,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 170,
      angle: 140,
      spread: 140,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  function restartGame() {
    randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
    for (let i = 0; i < humanElements.length; i++) {
      humanElements[i].style.display = 'none';
    }
    wrongLetters.textContent = '';
    tryCounter = 0;
    gameEndPopup.classList.remove('open');
    letterInput = ``;
    inputLetters = '';
    document.querySelector('.game-box__input-word').innerHTML = '';
    document.querySelector('.game-end-popup__win-lose-message').remove();
    document.querySelector('.gibbet__head').innerHTML = '';
    createInputLetters();
    gameEnd = false;
  }
};
