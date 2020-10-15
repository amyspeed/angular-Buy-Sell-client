import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from './types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings')
  }

  getListingById(id: string): Observable<Listing>{
    return this.http.get<Listing>(`/api/listings/${id}`)
  }

  patchViewToListing(id: string, views: number): Observable<Listing>{
    views ++;
    console.log(views)
    return this.http.patch<Listing>(
      `/api/listings/${id}`,
      [
        {
          "op": "replace",
          "path": "/views",
          "value": views
        }
      ],
      httpOptions,
    )
  }

  getListingsByUserId(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`/api/listings/user/${userId}`)
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete(`/api/listings/${id}`)
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return this.http.post<Listing>(
      '/api/listings',
      {
        name,
        description,
        price,
        userId: "12345"
      },
      httpOptions,
    )
  }

  editListing(id: number, name: string, description: string, price: number): Observable<Listing> {
    return this.http.put<Listing>(
      `/api/listings/${id.toString()}`,
      {
        id,
        name,
        description,
        price,
        userId: "12345"
      },
      httpOptions,
    )
  }
}
