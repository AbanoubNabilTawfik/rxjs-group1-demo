import { Observable } from "rxjs";
import { debounceTime, startWith, tap } from "rxjs/operators";

export enum RxJsLoggingLevel{
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level:RxJsLoggingLevel)
{
    rxjsLoggingLevel=level;
}
//higher order function
export const debug = (loggingLevel:number ,message:string)=>
                   (source:Observable<any>)=>source.pipe(
                    tap(value=>{
                        console.log(message + ":" ,value)
                    })
                   )