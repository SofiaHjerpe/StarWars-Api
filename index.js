import { fetchCharacters } from "./script.js";
import { addCharactersToDom } from "./utilities.js";
import { newPage } from "./utilities.js";
import { characterNames } from "./utilities.js";
import { createHomeworldInfoElements, createCharacterInfoElements } from "./utilities.js";
import { leftArrow, rightArrow } from "./utilities.js";
import { displayedCharactersOnPage } from "./utilities.js";
let pageIndex = 1;
const baseURL = "https://swapi.dev/api";
let displayedCharacters;

fetchCharacters(`${baseURL}/people?page=${pageIndex}`).then((characters) => {
  addCharactersToDom(characters);
  displayedCharacters = characters.results;
});

rightArrow.addEventListener("click", (e) => newPage(e));
leftArrow.addEventListener("click", (e) => newPage(e));
characterNames.addEventListener("click", (event) => handleOnCharactersClick(event));

async function handleOnCharactersClick(event) {
  const target = event.target;
  console.log(target);
  if (!target.classList.contains("character")) return;
  console.log("target contains character");
  const character = displayedCharacters.find(
    (character) => event.target.innerText === character.name
  );

  const characterOnOtherPage = displayedCharactersOnPage.find(
    (character) => event.target.innerText === character.name
  );
  console.log(character);
  console.log(characterOnOtherPage);
  if (character === undefined) return;
  if (characterOnOtherPage === undefined) return;

  const response = await fetch(character.homeworld);
  const homeworld = await response.json();
  console.log(homeworld);
  createCharacterInfoElements(character);
  createHomeworldInfoElements(homeworld);
}
