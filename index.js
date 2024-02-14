import { fetchCharacters } from "./script.js";
import { addCharactersToDom } from "./utilities.js";
import { newPage } from "./utilities.js";
export const leftArrow = document.querySelector(".material-symbols-outlined:nth-of-type(1)");
export const rightArrow = document.querySelector(".material-symbols-outlined:nth-of-type(2)");
let pageIndex = 1;

fetchCharacters(`https://swapi.dev/api/people?page=${pageIndex}`).then((characters) => {
  addCharactersToDom(characters);
});

rightArrow.addEventListener("click", (e) => newPage(e));
leftArrow.addEventListener("click", (e) => newPage(e));

