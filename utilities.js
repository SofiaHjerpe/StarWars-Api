const sectionOne = document.querySelector(".names");
const currentPageNumber = document.querySelector(".current-page");
import { fetchCharacters } from "./script.js";
import { leftArrow, rightArrow } from "./index.js";
let pageIndex = 1;
let pageNumber = 1;

export async function addCharactersToDom(characters) {
  let getCharactersToDom = characters.results
    .map((character) => {
      const characterItem = {
        name: `${character.name}`,
        index: `${character.url}`,
      };
      return `
           <section class="name-row">
             <h4 class="name"> ${characterItem.name} </h4>
           </section>
          
           `;
    })
    .join("");
  sectionOne.innerHTML = getCharactersToDom;
  let name = document.querySelector(".name");
  //  name.addEventListener("click", () => )
}

export function newPage(e) {
  if (e.target === rightArrow) {
    pageIndex++;
    fetchCharacters(`https://swapi.dev/api/people?page=${pageIndex}`).then((characters) => {
      addCharactersToDom(characters);
    });
    pageNumber = parseInt(pageIndex);
    currentPageNumber.innerHTML = `${pageNumber}/ 8 `;
  } else if (e.target === leftArrow) {
    if (pageIndex === 1) {
      return;
    } else {
      pageIndex--;
      fetchCharacters(`https://swapi.dev/api/people?page=${pageIndex}`).then((characters) => {
        addCharactersToDom(characters);
      });
      pageNumber = parseInt(pageIndex);
      currentPageNumber.innerHTML = `${pageNumber}/ 8 `;
    }
  }
}


