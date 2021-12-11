const imgArray = [
  'url(images/BENJAMIN_ANDRE.png) no-repeat center',
  'url(images/BURAK_YILMAZ.png) no-repeat center',
  'url(images/IVO_GRBIC.png) no-repeat center',
  'url(images/JONATHAN_DAVID.png) no-repeat center',
  'url(images/JOSE_FONTE.png) no-repeat center',
  'url(images/REINILDO.png) no-repeat center',
  'url(images/RENATO_SANCHES.png) no-repeat center',
  'url(images/XEKA.png) no-repeat center',
  'url(images/BENJAMIN_ANDRE.png) no-repeat center',
  'url(images/BURAK_YILMAZ.png) no-repeat center',
  'url(images/IVO_GRBIC.png) no-repeat center',
  'url(images/JONATHAN_DAVID.png) no-repeat center',
  'url(images/JOSE_FONTE.png) no-repeat center',
  'url(images/REINILDO.png) no-repeat center',
  'url(images/RENATO_SANCHES.png) no-repeat center',
  'url(images/XEKA.png) no-repeat center'
  ]

const cardsArray = document.querySelectorAll('.card');
let counterLife = document.querySelector('.life');
let counterPairs = document.querySelector('.pairs');

start(counterLife, counterPairs, imgArray);

let i = 0;
cardsArray.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (card.classList.contains('back')) {
        i++;
        card.classList.remove('back');
        card.classList.add('select');
        card.style.background = imgArray[index];
        card.style.backgroundSize = 'contain';
      } else if (card.classList.contains('select')) {
        card.style.background = '';
        card.classList.remove('select');
        card.classList.add('back');
        i = i - 1;
      }
      if (i == 2) {
        const cardsSelected = document.querySelectorAll('.select');
        card.parentElement.style.pointerEvents = 'none';
        if (cardsSelected[0].style.background == cardsSelected[1].style.background) {
          setTimeout(() => {
            cardsSelected[0].classList.replace('select', 'found');
            cardsSelected[1].classList.replace('select', 'found');
            counterPairs.innerHTML = parseInt(counterPairs.innerHTML) + 1;
            i = 0;
            if(counterPairs.innerHTML == '8') {
              card.parentElement.style.display = 'none';
              restarted('win');
            }
          }, 1000);
        } else {
          setTimeout(() => {
            cardsSelected[0].style.background = '';
            cardsSelected[1].style.background = '';
            cardsSelected[0].classList.replace('select', 'back');
            cardsSelected[1].classList.replace('select', 'back');
            i = 0;
            counterLife.innerHTML = parseInt(counterLife.innerHTML)-1;
            if (counterLife.innerHTML == '0') {
              card.parentElement.style.display = 'none';
              restarted('lose');
            }
          }, 1000);
        }
        setTimeout(() => {
          card.parentElement.style.pointerEvents = 'all';
        }, 1000);
      }
    })
});


function shuffleArray(imgArray) {
  imgArray.sort(() => Math.random() - 0.5);
}

function start(counterLife, counterPairs, imgArray) {
  counterLife.innerHTML = 8;
  counterPairs.innerHTML = 0;
  shuffleArray(imgArray);
}

function restarted(result) {
  const divResult = document.querySelector('.result');
  divResult.style.display = 'inline-block';
  if(result == 'win') {
    divResult.children[0].innerHTML = 'Bravo vous avez gagné la partie.';
  } else if(result == 'lose') {
    divResult.children[0].innerHTML = 'Dommage vous avez perdu la partie.';
  }
  divResult.children[1].addEventListener('click', () => {
    location.reload();
  })
}