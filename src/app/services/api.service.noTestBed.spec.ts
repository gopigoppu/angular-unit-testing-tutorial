import { TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defer } from 'rxjs/internal/observable/defer';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [ApiService, HttpClient]
  }));


  it('getUserDetail service should be return expected success response --- Using old way Jasmin spy obj', () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const service: ApiService = new ApiService(httpClientSpy);
    const mockUserDetail = {
      name: 'Gopi',
      id: 'gopigoppu'
    };
    httpClientSpy.get.and.returnValue(asyncData(mockUserDetail));
    service.getUserDetail('gopigoppu').subscribe(
      (userDetails) => {
        expect(userDetails).toEqual(mockUserDetail, 'expected user Detail');
      });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });


});
