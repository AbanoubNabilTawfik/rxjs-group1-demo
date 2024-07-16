import { Observable } from "rxjs";
import { Course } from "../model/course";


export function createHttpObservable(url: string):Observable<any[]> {

    const controller = new AbortController();
    const signal = controller.signal;

    return new Observable(observer => {
        fetch(url,{signal})
            .then(response => {
                if(response.ok)
                {
                    return response.json();
                }
                else
                {
                    observer.error("Request fails with status code"+response.status)
                }
                
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch(err => {
                console.log(err)
            });
         return ()=> controller.abort();
    })

}

export function createIndividualHttpObservable(url: string):Observable<Course> {

    const controller = new AbortController();
    const signal = controller.signal;

    return new Observable(observer => {
        fetch(url,{signal})
            .then(response => {
                return response.json();
            })
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch(err => {
                console.log(err)
            });
         return ()=> controller.abort();
    })

}