const homeContainer = document.querySelector('.home__container');
const overlayContainer = document.querySelector('.overlay__container');
const generateBtn = document.querySelector('#btn__generate');
const homeBtn = document.querySelector('#btn__back');
const tryBtn = document.querySelector('#btn__try');
const avatar = document.querySelector('#char__avatar');
const chName = document.querySelector('#char__name');
const species = document.querySelector('#char__species');
const homeworld = document.querySelector('#char__homeworld');
const url = 'https://vignette.wikia.nocookie.net/starwars/images';

let imgs = [
	`${url}/e/eb/ArtooTFA2-Fathead.png`,
	`${url}/3/3f/C-3PO_TLJ_Card_Trader_Award_Card.png`,
	'https://vignette.wikia.nocookie.net/fr.starwars/images/3/32/Dark_Vador.jpg',
	`${url}/4/48/Chewbacca_TLJ.png`,
	`${url}/d/d6/Yoda_SWSB.png`,
	'https://lumiere-a.akamaihd.net/v1/images/og-generic_02031d2b.png?region=0%2C0%2C1200%2C1200',
];

generateBtn.addEventListener('click', generate);

homeBtn.addEventListener('click', () => location.reload())

tryBtn.addEventListener('click', () => {
  overlayContainer.classList.remove('active');
  paintDisplay('', '', '', '')
  draw()
})


function generate() {
	homeContainer.classList.toggle('active');
	draw();
}

function randomSelect() {
  return Math.ceil(Math.random() * 89);
}

function paintDisplay(charAvatar, charName, charSpecies, charHome) {
  avatar.src = `${charAvatar}`;
  chName.innerText = `${charName}`;
  species.innerText = `${charSpecies}`;
  homeworld.innerText = `${charHome}`;
}

function characterPick() {
  $.get(
		`https://akabab.github.io/starwars-api/api/id/${randomSelect()}.json`,
		data => {
      const charAvatar = `${data["image"]}`
      const charName = `${data["name"]}`;
      const charSpecies = `${data["species"]}`
      let charHome = `${data["homeworld"]}`
      charHome = charHome[0].toUpperCase() + charHome.substring(1)
      paintDisplay(charAvatar, charName, charSpecies, charHome);
    }
	);
}

function draw() {
	const imgContainer = document.createElement('img');
	imgContainer.classList.add('img__container');
	homeContainer.insertAdjacentElement('afterend', imgContainer);
  imgContainer.classList.toggle('visible');

	let counter = 0;

	const interval = setInterval(() => {
    if (counter < imgs.length) {
      imgContainer.src = `${imgs[counter]}`;
      counter++;
    } else {
      counter = 0;
    }
	}, 20);

  setTimeout(() => {
    clearInterval(interval);
    characterPick();
    imgContainer.classList.toggle('visible')
    overlayContainer.classList.toggle("active")
  }, 2000) 
}
