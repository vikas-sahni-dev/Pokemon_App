const main = document.querySelector("main");

fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.results.length; i++) {
      showPokemonDetails(data.results[i].url);
    }
  });

function showPokemonDetails(url) {
  fetch(url)
    .then((res) => res.json())
    .then(({ name, sprites: allImgObject }) => {
      const orderedAllImgurl = [];
      orderedAllImgurl[0] = allImgObject.front_default;

      delete allImgObject.front_default;

      let allImgUrlExceptFirst = Object.values(allImgObject);

      for (let i = 1; i <= allImgUrlExceptFirst.length; i++) {
        orderedAllImgurl[i] = allImgUrlExceptFirst[i - 1];
      }

      const pokemonCardContainer = document.createElement("div");
      pokemonCardContainer.classList.add("pokemon-card-container");

      pokemonCardContainer.innerHTML = `
        <div class="left-arrow arrow"><img src="./images/left-arrow-icon.svg" alt="" /></div>
        <img
          src="${orderedAllImgurl[0]}"
          alt=""
          class="pokemon-img"
        />
        <div class="right-arrow arrow"><img src="./images/right-arrow-icon.svg" alt="pokemon" /></div>
        <p> ${name}</p>
      `;

      const leftControl = pokemonCardContainer.querySelector(".left-arrow");
      const rightControl = pokemonCardContainer.querySelector(".right-arrow");
      const img = pokemonCardContainer.querySelector(".pokemon-img");
      cardControls(leftControl, rightControl, img, orderedAllImgurl);

      main.appendChild(pokemonCardContainer);
    });
}

function cardControls(left, right, img, orderedAllImgurl) {
  let i = 0;
  console.log(orderedAllImgurl);

  right.addEventListener("click", () => {
    left.classList.add("show-left-arrow");
    if (i < orderedAllImgurl.length - 1) {
      console.log(i);

      img.src = orderedAllImgurl[++i];
      console.log(i);
    }
  });
  left.addEventListener("click", () => {
    console.log(i);

    if (i > 0) {
      img.src = orderedAllImgurl[--i];
      console.log(i);
    }
  });
}
