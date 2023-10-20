export const pokemonIds = [1,2,3,4,5];
pokemonIds.push(+"6");
//Interfaces no se puede instanciar 
interface Pokemon {
    id: number,
    name: string
    age?: number;
    lastname: string | undefined
}

export const pokemon:Pokemon = {
    id: 1,
    name: 'Bulbasaur',
    lastname: undefined
}
