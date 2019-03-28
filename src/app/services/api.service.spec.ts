import { TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { defer } from 'rxjs/internal/observable/defer';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('ApiService', () => {
  let service: ApiService;
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [ApiService, HttpClient]
  }));


  beforeEach(() => {
    service = TestBed.get(ApiService);
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getTeam service should be return expected response', () => {
    const teamStup = {
      name: 'Gopi',
      id: 'gopigoppu'
    };
    service.getTeam(teamStup).subscribe(
      (teamDetails) => {
        expect(teamDetails).toEqual(teamStup, 'expected teamStup');
      });
  });

  it('getTeam service should verify falsy return data', () => {
    const teamStub = {
      name: 'Gopi',
      id: 'gopigoppu'
    };
    const teamFalsyStub = {
      name: 'Kannan',
      id: 'gopigoppu'
    };
    service.getTeam(teamStub).subscribe(
      (teamDetails) => {
        expect(teamDetails).not.toEqual(teamFalsyStub, 'expected false teamStup');
      });
  });



});
