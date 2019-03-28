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

  afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
    backend.verify();
  }));

  it('service should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });




  it('getRepos should return expected repositories json response on 200 response',
    inject([ApiService, HttpTestingController],
      (apiService: ApiService, backend: HttpTestingController) => {

        const query = 'angular';
        const response = {
          total_count: 476791,
          incomplete_results: false,
          items: [
            {
              id: 26634362,
              node_id: 'MDEwOlJlcG9zaXRvcnkyNjYzNDM2Mg==',
              name: 'angular',
              full_name: 'OOP-Code-Bunny/angular'
            }
          ]
        };

        apiService.getRepos(query).subscribe(
          (data: any) => {
            console.log('data', data);
            expect(data.total_count).toBe(476791);
            expect(data.items[0].name).toEqual('angular');
          },
          (error: any) => { }
        );


        const mockReq = backend.expectOne('https://api.github.com/search/repositories?q=angular');

        console.log('mockReq', mockReq);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(response);

      }
    )
  );

  it('getRepos should return expected error response on 404 response',
    inject([ApiService, HttpTestingController],
      (apiService: ApiService, backend: HttpTestingController) => {

        const query = 'angular';

        const errorResponse = new HttpErrorResponse({
          error: 'test 404 error',
          status: 404,
          statusText: 'Not Found'
        });

        apiService.getRepos(query).subscribe(
          (res: any) => {
            expect(res.error).toEqual('test 404 error');
          },
          (error: any) => { }
        );

        const mockReq = backend.expectOne('https://api.github.com/search/repositories?q=angular');

        console.log('mockReq', mockReq);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush(errorResponse);
      }
    )
  );

});
