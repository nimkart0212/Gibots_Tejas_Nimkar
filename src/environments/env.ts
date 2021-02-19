import {ProdEnviroment} from './prod.env';
import {DevEnviroment} from './dev.env';

/* Interface for Enviroment Variable */
export interface Environment{
    db_url:string
}

/*process.env.NODE_ENV is globle Variable inject by node and it is represent the state of the system enviroment when application start */
export function getEnvironmentVariable(){
    if(process.env.NODE_ENV === 'production'){
        return ProdEnviroment
    }else{
        return DevEnviroment
    }

}