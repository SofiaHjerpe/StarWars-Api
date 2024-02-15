import { fetchCharacters } from "./script.js";
export const characterNames = document.querySelector(".names");

const details = document.querySelector(".information");
const homeWorldElement = document.querySelector(".homeworld");

const currentPageNumber = document.querySelector(".current-page");

export const leftArrow = document.querySelector(".material-symbols-outlined:nth-of-type(1)");
export const rightArrow = document.querySelector(".material-symbols-outlined:nth-of-type(2)");
let pageIndex = 1;
let pageNumber = 1;
export let displayedCharactersOnPage;

export async function addCharactersToDom(characters) {
  let getCharactersToDom = characters.results
    .map((character, index) => {
      const characterItem = {
        name: `${character.name}`,
        homeWorld: `${character.homeworld}`,
      };
      index = index + 1;
      return `
             <h4 class="character" id="${index}"> ${characterItem.name} </h4>
           `;
    })
    .join("");
  characterNames.innerHTML = getCharactersToDom;
}

export function createCharacterInfoElements(character) {
  const characterInfoElements = /*html*/ `
  <h3 class="character-info-name">${character.name}</h3>
  <div class="character-info">Height: ${character.height}</div>
  <div class="character-info">Mass: ${character.mass} kg</div>
  <div class="character-info">Hair color: ${character.hair_color}</div>
  <div class="character-info">Skin color: ${character.skin_color}</div>
  <div class="character-info">Eye color: ${character.eye_color}</div>
  <div class="character-info">Birth year: ${character.birth_year}</div>
  <div class="character-info">Gender: ${character.gender}</div>
  `;

  details.innerHTML = characterInfoElements;
}

export function createHomeworldInfoElements(homeworld) {
  console.log(homeWorldElement);
  const homeworldInfoElements = /*html*/ `
  <h3 class="homeworld-info-name">${homeworld.name}</h3>
  <div class="homeworld-info">Rotation period: ${homeworld.rotation_period} hours</div>
  <div class="homeworld-info">Orbital period: ${homeworld.orbital_period} days</div>
  <div class="homeworld-info">Diameter: ${homeworld.diameter} km</div>
  <div class="homeworld-info">Climate: ${homeworld.climate}</div>
  <div class="homeworld-info">Gravtity: ${homeworld.gravity} G</div>
  <div class="homeworld-info">Terrain: ${homeworld.terrain}</div>
`;

  homeWorldElement.innerHTML = homeworldInfoElements;
}
export function newPage(e) {
  if (e.target === rightArrow && pageIndex <= 8) {
    pageIndex++;
    fetchCharacters(`https://swapi.dev/api/people?page=${pageIndex}`).then((characters) => {
      addCharactersToDom(characters);
       displayedCharactersOnPage = characters.results;
    });
    pageNumber = parseInt(pageIndex);
    currentPageNumber.innerHTML = `${pageNumber} / 8 `;
  } else if (e.target === leftArrow) {
    if (pageIndex === 1) {
      return;
    } else {
      pageIndex--;
      fetchCharacters(`https://swapi.dev/api/people?page=${pageIndex}`).then((characters) => {
        addCharactersToDom(characters);
         displayedCharactersOnPage = characters.results;
      });
      pageNumber = parseInt(pageIndex);
      currentPageNumber.innerHTML = `${pageNumber} / 8 `;
    }
  }
}
