import { DestroyRef, inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

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
    return this.fetchPlaces('http://localhost:3000/user-places', 'Something Went Wrong fetching favorite places');
  }

  addPlaceToUserPlaces(placeId: string) {
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: placeId
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
