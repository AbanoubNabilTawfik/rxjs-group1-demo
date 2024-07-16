import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { response } from 'express';
import { AsyncSubject, BehaviorSubject, concat, fromEvent, interval, Observable, of, ReplaySubject, Subject, timer } from 'rxjs';
import { createHttpObservable } from '../common/util';
import { map } from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // document.addEventListener("click", event => {
    //   console.log(event);

    //   setTimeout(() => {
    //     console.log("finished......")

    //     let counter = 0;
    //     setInterval(() => {
    //       console.log(counter);
    //       counter++;
    //     }, 1000)
    //   }, 3000)


    // });

    //const interval$ = interval(1000);
    // const interval$ = timer(3000,1000);

    // const sub = interval$.subscribe(value=>console.log("stream 1",value));

    // // interval$.subscribe(value=>console.log("stream 1 ",value));
    // // interval$.subscribe(value=>console.log("stream 2 ",value));

    // setTimeout(()=>{
    //   sub.unsubscribe();
    // },5000)

    // const click$ =fromEvent(document,"click");

    // // click$.subscribe(
    // //   evt=>console.log(evt),
    // //   err=>console.log(err),
    // //   ()=>console.log("completed....")
    // // )

    // click$.subscribe({
    //   next:data=>console.log(data),
    //   error:err=>console.log(err),
    //   complete:()=>console.log("completed....")
    // })

    // const http$ = Observable.create(observer => {
    //   fetch('/api/courses')
    //    .then(response => {
    //     return response.json();
    //   })
    //   .then(body => {
    //     observer.next(body);
    //     observer.complete();
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //   })
    // })

    // http$.subscribe({
    //   next:data=>console.log(data)
    // })

    
    // const source1$ =of(1,2,3);
    // const source2$ =of(4,5,6);

    // const result$ =concat(source1$,source2$);

    // result$.subscribe(console.log)

    // const http$=createHttpObservable('/api/courses');
    // const sub = http$.subscribe();


    // setTimeout(() => {
    //    sub.unsubscribe();
    // }, 0);

    // const subject = new Subject();

    // subject.subscribe(value=>console.log("Subscriber 1 ",value));

    // subject.next(1);

    // subject.subscribe(value=>console.log("Subscriber 2 ",value));

    // subject.next(2);

    // const behavourSubject = new BehaviorSubject("hello1");

    // behavourSubject.subscribe(value=>console.log("Subscriber 1 ",value));

    // behavourSubject.next("hello2");

    // behavourSubject.subscribe(value=>console.log("Subscriber 2 ",value));

    // behavourSubject.next("hello3");
    // behavourSubject.next("hello4");
    // behavourSubject.next("hello5");
    // behavourSubject.next("hello6");
    // behavourSubject.next("hello7");
    // behavourSubject.subscribe(value=>console.log("Subscriber 3 ",value));

    //the paramter is buffer size اللى هيجى جديد هيشوف قيمتين من القديم
    // const replySubject = new ReplaySubject(2);

    // replySubject.subscribe(value=>console.log("Subscriber 1 ",value));

    // replySubject.next(1);
    // replySubject.next(2);


    // replySubject.subscribe(value=>console.log("Subscriber 2 ",value));

    // replySubject.next(3);

    const asyncSubject = new AsyncSubject();

    asyncSubject.subscribe(value=>console.log("Subscriber 1 ",value));

    asyncSubject.next(1);
    asyncSubject.next(2);


    asyncSubject.subscribe(value=>console.log("Subscriber 2 ",value));

    asyncSubject.next(3);

    asyncSubject.complete();


  }

  //what is rxjs?
  //when should we use it ? why ?
  //what ar bengits of rxjs?

}
