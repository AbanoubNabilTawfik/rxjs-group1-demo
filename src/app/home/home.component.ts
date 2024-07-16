import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delay, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    beginnerCourses$ :Observable<Course[]>;
    advancedCourses$ :Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

        const http$:Observable<Course[]> = createHttpObservable('/api/courses')

        const courses$:Observable<Course[]> = http$.pipe(
            // catchError(err=>{
            //     console.log("An error occured ",err)
            //     return throwError(err);
            // }),
            
            // finalize(()=>{
            //     console.log("finalize called ......")
            // }),

            map(res => Object.values(res["payload"])),
            shareReplay<Course[]>(),
            retryWhen(err=>err.pipe(
                //delayWhen(()=>timer(2000))
                delay(2000)
            ))

            // catchError(err=>of([
            //     {
            //         id: 0,
            //         description: "RxJs In Practice Course",
            //         iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
            //         courseListIcon: 'https://angular-academy.s3.amazonaws.com/main-logo/main-page-logo-small-hat.png',
            //         longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
            //         category: 'BEGINNER',
            //         lessonsCount: 10
            //     }
            // ]))
            
            
        )

        //courses$.subscribe(res=>console.log(res))
        //courses$.subscribe(console.log)

        // courses$.subscribe({
        //     next: data => {
        //         console.log(data);
        //         this.beginnerCourses=data.filter(course=>course.category=="BEGINNER");
        //         this.advancedCourses=data.filter(course=>course.category=="ADVANCED");

        //     }
        // })
       
        this.beginnerCourses$=courses$.pipe(
            map(res=>res.filter(course=>course.category=="BEGINNER"))
        )

        this.advancedCourses$=courses$.pipe(
            map(res=>res.filter(course=>course.category=="ADVANCED"))
        )
        
    

    }

}
