import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserRecordService {

  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(route);
    return this.apiService.getUserDetail(route.params.userid);
  }
}
