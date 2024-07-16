import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay,
    throttle,
    throttleTime
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, interval, forkJoin} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable, createIndividualHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;
    
    courseId;

    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        const courseId = this.route.snapshot.params['id'];
        this.courseId=courseId;

        this.course$ = createIndividualHttpObservable(`/api/courses/${courseId}`).pipe(
            debug(RxJsLoggingLevel.INFO,"course value")
        );
        this.lessons$ = this.loadLessons();

        forkJoin(this.course$,this.lessons$).pipe(
            tap(([course,lessons])=>{
                 console.log("course",course);
                 console.log("lessons",lessons)
            }
        )).subscribe()

    }

    ngAfterViewInit() {

        const serachLessons$= fromEvent(this.input.nativeElement,'keyup').pipe(
            map((event:any)=>event.target.value),
            startWith(''),
            //debounceTime(600),
           // distinctUntilChanged(),
            //throttle(()=>interval(500)),
            throttleTime(500),
            //switchMap(serachTerm=>this.loadLessons(serachTerm)),
            debug(RxJsLoggingLevel.INFO,"lessons value")
         )

         const initialLessons$ =this.loadLessons();
         this.lessons$=concat(initialLessons$,serachLessons$);

    }

    loadLessons(serachTerm="")
    {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${serachTerm}`).pipe(
            map(res=>res["payload"]),
            debug(RxJsLoggingLevel.INFO,"lessons value")

        ) 
    }

}
