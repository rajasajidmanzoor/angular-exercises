import { DestroyRef, inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  

  loadAvailablePlaces() {
    return this.fetchPlaces('http://localhost:3000/places', 'Something Went Wrong');
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places', 'Something Went Wrong fetching favorite places').pipe(tap({
      next: (userPlaces)=> this.userPlaces.set(userPlaces),
    }));
  }

  addPlaceToUserPlaces(place: Place) {
    this.userPlaces.update((prevPlaces)=> [...prevPlaces, place]);
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    })
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces (url:string, errMsg: string) {
    return this.httpClient.get<{ places: Place[]}>(url).pipe(
      map((resData)=> resData.places),
      catchError((error)=> {
        console.log(error);
        return throwError(()=>{
          new Error(errMsg);
        });
      })
    )
  }
}
