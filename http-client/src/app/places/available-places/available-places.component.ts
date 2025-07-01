import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{
  isFetching = signal(false);
  error = signal('');
  places = signal<Place[] | undefined>(undefined);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);


  ngOnInit() {
    console.log('Before Sending Request');
    console.log('isFetching'+ this.isFetching());

    this.isFetching.set(true);
    const sub = this.httpClient.get<{ places: Place[]}>('http://localhost:3000/places').pipe(
      map((resData)=> resData.places)
    ).subscribe({
      next: (places)=>{
        this.places.set(places);
        
      },
      complete: ()=>{
        this.isFetching.set(false);
        console.log('After Sub Destroyed1');
      },
      error : (error)=>{
        this.error.set(error.message);
      }
    });

    this.destroyRef.onDestroy(()=>{
      sub.unsubscribe();
    });
  }
}
