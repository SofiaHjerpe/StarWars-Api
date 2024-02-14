const sectionOne = document.querySelector(".section-one");

export async function addCharactersToDom(characters) {
  let getCharactersToDom = characters.results
    .map((character) => {
      const characterItem = {
        name: `${character.name}`,
      };
      return `
           <section class="name-row">
             <h4 class="name"> ${characterItem.name} </h4>
           </section>
          
           `;
    })
    .join("");
  sectionOne.innerHTML = getCharactersToDom;
}
