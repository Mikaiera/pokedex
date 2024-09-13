const pokeContainer = document.getElementById('poke_Container')// hold the number of pokemon we want to display.
const poke_Num = 1550// holds the number of pokemon we want to display.


let cardDetails = async () => {
    //an array called poke_Num that holds all the pokemon details for each card.
    for (let i = 1; i <= poke_Num; i++) {
        await getPokemon(i)
    }
}

//fetches the data thats needed from the array 
const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    //fetch responds to the promises and fetches the url
    const thepokemon = await fetch(url);
    //this returns a promise that will parse the data as text json
    const data = await thepokemon.json();
    createPokemonCard(data)
}

cardDetails();

function createPokemonCard(data) {
    var pokemon = document.createElement('div')
    pokemon.classList.add('pokemon')//actual pokemon card

    const name = data.name[0].toUpperCase() + data.name.slice(1);//capitilises the first letter/char of the name 
    const poketure = data.sprites["front_default"];
    const poketype = data.types.map((type) => type.type.name).join(" ")

    const pokemonInnerHTML = `
        <div class='image-Container'>
            <img
            src="${poketure}"
            >
        </div>

        <div class='info'>
            <h3 class=poke-Name>${name}</h3>         
            <span class="poke-id">#${data.id
                .toString()//converts the number to string so that the padstring parameter 
                /*note padstart essentially takes in a  target length and the padString and it will add whatever
                string you want to the length that you set until it is that exact length*/
                .padStart(3, "0")}</span>
            <br>
            <div class="poke-type">Type: ${poketype}</div>
        </div>
    `
    pokemon.innerHTML = pokemonInnerHTML;//javascript colleted data is now going to be displayed in html

    pokeContainer.appendChild(pokemon);//without this the pokemon cards wont be displayed within the main div
}