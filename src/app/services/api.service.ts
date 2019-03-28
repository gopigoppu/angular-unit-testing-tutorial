import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly searchUrl = 'https://api.github.com/search/repositories?q=';
  readonly userFetchUrl = 'https://api.github.com/users/';

  constructor(public http: HttpClient) { }

  getRepos(query) {
    return this.http.get(this.searchUrl + query);
  }
  getUserDetail(userid) {
    return this.http.get(this.userFetchUrl + userid).pipe(
      map(res => res),
      catchError((err: HttpErrorResponse) => {
        return Observable.throw(err);
      }
      ));
  }
  getTeam(team: any): Observable<any> {
    return of(team);
  }
}
