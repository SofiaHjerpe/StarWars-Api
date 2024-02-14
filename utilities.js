const sectionOne = document.querySelector(".names");
const hide = document.querySelector(".hide");
const details = document.querySelector(".information");
const homeWorld = document.querySelector(".homeworld");
const currentPageNumber = document.querySelector(".current-page");
import { fetchCharacters } from "./script.js";
import { baseURL, leftArrow, rightArrow } from "./index.js";

let pageIndex = 1;
let pageNumber = 1;

export async function addCharactersToDom(characters) {
  let getCharactersToDom = characters.results
    .map((character, index) => {
      const characterItem = {
        name: `${character.name}`,
        homeWorld: `${character.homeworld}`,
      };
      index = index + 1;
      return `
           <section class="name-row">
             <h4 class="character" id="${index}"> ${characterItem.name} </h4>
           </section>
           `;
    })
    .join("");
  sectionOne.innerHTML = getCharactersToDom;
  let infoCharacters = document.querySelectorAll(".character");
  infoCharacters.forEach((character) =>
    character.addEventListener("click", (e) => fetchOneCharacter(e))
  );
}

function fetchOneCharacter(e) {
  hide.classList.remove("hide");
  let index = e.target.id;
  console.log(index);
  fetchCharacters(`${baseURL}/people/${index}`).then((character) => {
    addCharacterToDom(character);
  });
  fetchCharacters(`${baseURL}/planets/${index}/`).then((homeworld) => {
    createHomeworldInfoElements(homeworld);
  })
}

export function addCharacterToDom(character) {
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
  const homeworldInfoElements = /*html*/ `
  <h3 class="homeworld-info-name">${homeworld.name}</h3>
  <div class="homeworld-info">Rotation period: ${homeworld.rotation_period} hours</div>
  <div class="homeworld-info">Orbital period: ${homeworld.orbital_period} days</div>
  <div class="homeworld-info">Diameter: ${homeworld.diameter} km</div>
  <div class="homeworld-info">Climate: ${homeworld.climate}</div>
  <div class="homeworld-info">Gravtity: ${homeworld.gravity} G</div>
  <div class="homeworld-info">Terrain: ${homeworld.terrain}</div>
`;

 homeWorld.innerHTML = homeworldInfoElements;
}
export function newPage(e) {
  if (e.target === rightArrow && pageIndex <= 8) {
    pageIndex++;
    fetchCharacters(`https://swapi.dev/api/people?page=${pageIndex}`).then((characters) => {
      addCharactersToDom(characters);
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
      });
      pageNumber = parseInt(pageIndex);
      currentPageNumber.innerHTML = `${pageNumber} / 8 `;
    }
  }
}
