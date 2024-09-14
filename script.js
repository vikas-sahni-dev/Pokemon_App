const form = document.querySelector("form");
const searchInputElement = document.querySelector("#search-input");
const pokemonName = document.querySelector("#pokemon-name");
const id = document.querySelector("#pokemon-id");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const weightAndHeightContainer = document.querySelector(
  "#weight-and-height-container"
);
const type = document.querySelector("#types span");
const type2 = document.createElement("span");
const HP = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const specialAttack = document.querySelector("#special-attack");
const specialDefense = document.querySelector("#special-defense");
const speed = document.querySelector("#speed");
const allStatsVariableArray = [
  HP,
  attack,
  defense,
  specialAttack,
  specialDefense,
  speed,
];

function validateInput() {
  let userSearchValue = searchInputElement.value.toLowerCase().trim();
  const regex1 = /[.]/;
  const regex2 = /[♀]/;
  if (regex1.test(userSearchValue)) {
    userSearchValue = userSearchValue.replace(regex1, "-");
    return userSearchValue;
  } else if (regex2.test(userSearchValue)) {
    userSearchValue = userSearchValue.replace(regex2, "-f");
    return userSearchValue;
  } else {
    return userSearchValue;
  }
}

function showPokemonStats(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      pokemonName.innerText = data.name;
      id.innerText = `#${data.id}`;
      weight.innerText = `Weight: ${data.weight}`;
      height.innerText = `Height: ${data.height}`;

      //removing old  img before adding new img
      if (weightAndHeightContainer.nextElementSibling.tagName === "IMG") {
        weightAndHeightContainer.nextElementSibling.remove();
      }

      const img = document.createElement("img");
      img.id = "sprite";
      img.src = `${data.sprites.front_default}`;
      weightAndHeightContainer.insertAdjacentElement("afterend", img);
      allStatsVariableArray.forEach((statVariable, i) => {
        statVariable.innerText = data.stats[i].base_stat;
      });

      type.innerText = data.types[0].type.name;
      type.classList.add("first-type");

      type2.remove();

      if (data.types.length === 2) {
        type2.innerText = data.types[1].type.name;
        type.insertAdjacentElement("afterend", type2);
        type2.classList.add("second-type");
      }

      console.log(data.types[0].type.name);
    });
}

function findPokemon() {
  const url = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
  fetch(url)
    .then((res) => res.json())
    .then(({ results: allPokemon }) => {
      const searchInput = validateInput();
      for (let i = 0; i < allPokemon.length; i++) {
        if (
          allPokemon[i].name === searchInput ||
          allPokemon[i].id === Number(searchInput)
        ) {
          showPokemonStats(allPokemon[i].url);

          break;
        }
        if (i === allPokemon.length - 1) {
          alert("Pokémon not found");
        }
      }
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  findPokemon();
});
