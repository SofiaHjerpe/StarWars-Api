const sectionOne = document.querySelector(".names");
const currentPageNumber = document.querySelector(".current-page");
import { fetchCharacters } from "./script.js";
import { leftArrow, rightArrow } from "./index.js";
let pageIndex = 1;
let pageNumber = 1;

export async function addCharactersToDom(characters) {
  let getCharactersToDom = characters.results
    .map((character, index) => {
      const characterItem = {
        name: `${character.name}`,
        index: index,
      };
      console.log(characterItem.index);
      return `
           <section class="name-row">
             <h4 class="name" id="${characterItem.index}"> ${characterItem.name} </h4>
           </section>
           `;
    })
    .join("");
  sectionOne.innerHTML = getCharactersToDom;
  let name = document.querySelector(".name");
  name.addEventListener("click", (e) => fetchOneCharacter(e));
}

export function newPage(e) {
  if (e.target === rightArrow) {
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



function fetchOneCharacter(e) {
   let index = e.target.getAttribute("id");
  fetchCharacters(`https://swapi.dev/api/people/${index}`).then((character) => {
    addCharacterToDom(character, index);
  });
}
function addCharacterToDom(character, index) {
  console.log(index);
  console.log(character);
}
