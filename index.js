import { fetchCharacters } from "./script.js";
import { addCharactersToDom } from "./utilities.js";
const rightArrow = document.querySelector(".material-symbols-outlined:nth-of-type(2)");
let index = 1;
rightArrow.addEventListener("click", (e) => nextPage());
fetchCharacters(`https://swapi.dev/api/people?page=${index}`).then((characters) => {
  addCharactersToDom(characters);
});
function nextPage() {
  index === 1 ? index = 2 : index
  fetchCharacters(`https://swapi.dev/api/people?page=${index}`).then((characters) => {
    addCharactersToDom(characters);
  });
  index++;
}
