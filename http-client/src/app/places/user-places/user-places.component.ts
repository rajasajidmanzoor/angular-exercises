import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {

   isFetching = signal(false);
    error = signal('');
    places = signal<Place[] | undefined>(undefined);
    private httpClient = inject(HttpClient);
    private placesService = inject(PlacesService);
    private destroyRef = inject(DestroyRef);
  
  
    ngOnInit() {
      console.log('Before Sending Request');
      console.log('isFetching'+ this.isFetching());
  
      this.isFetching.set(true);
      const sub = this.placesService.loadUserPlaces().subscribe({
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
