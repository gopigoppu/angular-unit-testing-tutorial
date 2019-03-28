import { TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defer } from 'rxjs/internal/observable/defer';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

class MockHttpClient {
  get() {
    const stub = {
      name: 'Gopi'
    };
    return asyncData(stub);
  }
}

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [
      ApiService,
      { provide: HttpClient, useClass: MockHttpClient }
    ]
  }));


  it('service should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('getUserDetail service should be return expected success response --- Using MockClass', () => {
    const service: ApiService = TestBed.get(ApiService);
    const stubToCheck = {
      name: 'Gopi'
    };
    service.getUserDetail('gopigoppu').subscribe(
      (userDetails) => {
        expect(userDetails).toEqual(stubToCheck, 'expected user detail');
      });
  });



});


