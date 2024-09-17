const pokeContainer = document.getElementById('poke_Container')
const searchBox = document.querySelector("form");
const input = document.querySelector("input[type=text]");

// listen for user events 
searchBox.addEventListener("submit", (e) => {
    e.preventDefault();//prevents refreshing from occuring
    pokeContainer.innerHTML = "";

    getPokemon(input.value);
  });

//fetches the data thats needed from the pokeapi
async function getPokemon (name= "pikachu") {
    //fetch responds to the promises and fetches the url
    const thepokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    //this returns a promise that will parse the data as text json
    const data = await thepokemon.json();

    const pokemon = document.createElement('div')
    pokemon.classList.add('poke')//actual pokemon card
 
    const poketure = data.sprites["front_default"];
    const poketype = data.types.map((type) => type.type.name).join(" ")

    const pokemonInnerHTML = `
        <article>
            <div class='image-Container'>
                <img
                src="${poketure}"
                >
            </div>

            <div class='info'>
                <h4 class=poke-Name>${name}</h4>  
        
                <span class="pokeid">#${data.id
                    .toString()
                    /*note to self padstart essentially takes in a  target length and the padString and it will add whatever 
                    string you want to the length that you set until it is that exact length*/
                    .padStart(3, "0")}
                </span>

            <br>

                <div class="poketype">
                
                    Type: ${poketype}

    
                </div>
            </div>

            <div class="stats" style=".stats:hover: zoom 0" >
            ${data.stats.map((stat) => {
                return `<p>${stat.stat.name}: ${stat.base_stat}</p>`})
            .join(" ")}
            </div>
        </article>
    `
    pokemon.innerHTML = pokemonInnerHTML;//javascript colleted data is now going to be displayed in html

    pokeContainer.appendChild(pokemon);//without this the pokemon cards wont be displayed within the main div
}
  
//this function displays everything
  getPokemon();
  
  
  