import axios from 'axios'

export class Pokemon{
    //atributos 
    //public readonly id: number;
    //public name: string;
    //constructor
    /*constructor(id: number, name: string){
        this.id = id;
        this.name = name;
    }*/
    public imageURL: string;
    //Constructor simplificado
    constructor(
        public readonly id: number, 
        public name: string,
        ){
        this.imageURL = `https://pokemon.com/${this.id}.jpg`;
    }
    //get and set 
    get getImageURL():string{
        return `https://pokemon.com/${this.id}.jpg`;
    }

    scream(){
        console.log(`${this.name.toLocaleUpperCase()}!!!!`);
    }

    speak(){
        console.log(`${this.name}, ${this.id}!!!!`);
    }

    async getMoves(){
        const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/4`)
        console.log(data.moves);
        
        return data.moves;
        
    }
}

export const chamander = new Pokemon(4,"Chamander");
console.log(chamander.getMoves());

