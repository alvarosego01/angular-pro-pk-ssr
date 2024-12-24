
const TOTAL_POKEMONS = 20;
const TOTAL_PAGES = 20;

(
    async () => {

        const fs = require('fs');

        const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
        let fileContent = pokemonIds.map(id => `/pokemon/${id}`).join('\n');

        //Paginas de pokemons
        for (let index = 0; index < TOTAL_PAGES; index++) {
            fileContent += `\n/pokemons/page/${index + 1}`;
        }

        // por nombre
        const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(res => res.json());

        fileContent += '\n' + pokemonList.results.map(pokemon => `/pokemon/${pokemon.name}`).join('\n');

        console.log('fileContent', fileContent);

        fs.writeFileSync('routes.txt', fileContent);

        console.log('Routes generated!');

    }
)();