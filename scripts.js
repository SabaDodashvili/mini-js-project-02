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
  let wordsArr = ['programming', 'landing', 'cabbage', 'snake', 'interruption'];
  let randomWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  let wrongLetters = document.querySelector('.wrong-letters__board');
  let humanElements = document.querySelectorAll('.human-element');
  let tryCounter = 0;
  let letterInput = ``;
  let buttonKey;

  for (let i = 0; i < randomWord.length; i++) {
    letterInput += `<span class="input-word__letter"></span>`;
  }

  document.querySelector('.game-box__input-word').insertAdjacentHTML('afterbegin', letterInput);
  let inputWordLettersArr = document.querySelectorAll('.input-word__letter');

  document.addEventListener('keyup', (e) => {
    let regxp = /[a-z|A-Z]/;
    buttonKey = e.key.toLowerCase();
    let guessedLetters = '';
    for (let i = 0; i < inputWordLettersArr.length; i++) {
      guessedLetters += inputWordLettersArr[i].textContent;
    }
    if (regxp.test(buttonKey) && buttonKey.length == 1 && randomWord.indexOf(buttonKey) !== -1 && guessedLetters.indexOf(buttonKey) == -1) {
      documentActions(e);
    } else if (regxp.test(buttonKey) && buttonKey.length == 1 && wrongLetters.textContent.indexOf(buttonKey) == -1 && guessedLetters.indexOf(buttonKey) == -1) {
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
              <span class="gibbet-head__tongue"></span>
							`;
      }
    }
  });
  function documentActions(e) {
    let indexsArr = getListIdx(randomWord, buttonKey);
    for (let i = 0; i < inputWordLettersArr.length; i++) {
      for (let k = 0; k < indexsArr.length; k++) {
        if (indexsArr[k] === i) {
          inputWordLettersArr[i].textContent = buttonKey;
        }
      }
    }
  }

  function getListIdx(str, substr) {
    let listIdx = [];
    let lastIndex = -1;
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
      listIdx.push(lastIndex);
    }
    return listIdx;
  }
};
