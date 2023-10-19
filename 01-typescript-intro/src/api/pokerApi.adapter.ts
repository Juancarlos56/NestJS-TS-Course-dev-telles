import axios from "axios";

////principio de sustitución de liskov
export interface HttpAdapter{
    get<T>(url:string): Promise<T>;
    post<T>(url:string, data:any): Promise<T>;
}

export class PokeApiFetchAdapter implements HttpAdapter{
    post<T>(url: string, data: any): Promise<T> {
        throw new Error("Method not implemented.");
    }
    //Metodos genericos
    async get<T>(url : string):Promise<T>{
        const resp = await fetch(url);
        const data:T = await resp.json();
        return data;
    }
}

export class PokenApiAdapter implements HttpAdapter{
    private readonly axios = axios; 

    post<T>(url: string, data: any): Promise<T> {
        throw new Error("Method not implemented.");
    }

    //Metodos genericos
    async get<T>(url : string):Promise<T>{
        const {data} = await this.axios.get<T>(url);
        return data;
    }
    
    async put(url : string, data:any){
        return ;
    }
    async delete(url : string){
        return ;
    }
    async patch(url : string, data:any){
        return ;
    }

}