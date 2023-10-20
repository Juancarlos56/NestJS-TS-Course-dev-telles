class NewPokemon{
    constructor(public readonly id: number, public name: string){}

    scream(){
        console.log(`NO quiero!!!`);
        
    }

    speak(){
        console.log(`No quiero hablar!!!`);
    }
}

//Tiene acceso a la definicion de la clase y va a poder extender agregar o crear una nueva clase basada en su clase
const MyDecorator = () => {
    return (target: Function) =>{
        //console.log(target);
        return NewPokemon;
    }
};

@MyDecorator()
export class Pokemon{
    constructor(public readonly id: number, public name: string){

    }

    scream(){
        console.log(`${this.name.toUpperCase()}!!!`);
        
    }

    speak(){
        console.log(`${this.name}, ${this.name}!!!`);
    }

}

export const chamander = new Pokemon(4, 'Chamander');
chamander.scream();
chamander.speak();