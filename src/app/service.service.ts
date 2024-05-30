import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = 'https://api.themoviedb.org/3/discover/movie';
  private apiKey = '4daa0577bc0054cf79815ffbd5a53397';

  constructor(private http: HttpClient) {}

  getApi(id:number) {
    // const url = `${this.apiUrl}?api_key=${this.apiKey}&page=${id}`;
    const params = new HttpParams().set('api_key',this.apiKey);
    return this.http.get<any>(`${this.apiUrl}?page=${id}`, { params });
    // console.log('dsadsadsa: ', url)
    // return this.http.get(params);
   }

  //  getMultiplePages(startPage: number, endPage: number): Observable<any[]> {
  //   let observables: Observable<any>[] = [];
  //   for (let id = startPage; id <= endPage; id++) {
  //     observables.push(this.getApi(id));
  //   }
  //   console.log(observables);
  //   return forkJoin(observables);
  // }
}