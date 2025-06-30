import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, subscribeOn, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

  private destroyRef = inject(DestroyRef);

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  constructor() {
    // effect(()=>{
    //   console.log( `Button Clicked ${this.clickCount()} Times` );
    // });
  }

  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map((val)=> val*2),
    // ).subscribe({
    //   next: (val)=> console.log(val)
    // });
    
    const subscription = this.clickCount$.subscribe({
      next: (val)=> {
        console.log( `Button Clicked ${this.clickCount()} Times` );
      }
    });

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    });

  
  }

  onClick(){
    this.clickCount.update(prevCount=> prevCount+1);
  }


}
