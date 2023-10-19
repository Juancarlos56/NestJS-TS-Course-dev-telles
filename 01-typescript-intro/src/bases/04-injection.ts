import { HttpAdapter, PokeApiFetchAdapter, PokenApiAdapter } from '../api/pokerApi.adapter';

export class Pokemon {

    get imageUrl(): string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }
  
    constructor(
        public readonly id: number, 
        public name: string,
        // Todo: inyectar dependencias
        //principio de sustitución de liskov
        private readonly http: HttpAdapter
    ) {}

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    speak() {
        console.log(`${ this.name }, ${ this.name }`);
    }

    async getMoves(): Promise<any> {
        const { data } = await this.http.get<any>('https://pokeapi.co/api/v2/pokemon/4');
        console.log( data.moves );
        
        return data.moves;
    }

}
const apiAxios:PokenApiAdapter = new PokenApiAdapter();
const apiFetch:PokeApiFetchAdapter = new PokeApiFetchAdapter();

export const chamander = new Pokemon(4,"Chamander", apiFetch);
export const chamander2 = new Pokemon(4,"Chamander2", apiAxios);
console.log(chamander.getMoves());
console.log(chamander2.getMoves());