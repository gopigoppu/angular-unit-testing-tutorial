import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';

import { UserRecordService } from './user-record.service';
import { ApiService } from '../services/api.service';
import { observerSuccessStub, observerErrorStub } from '../../utt-helpers/async-helpers';
import { ActivatedRouteSnapshot } from '@angular/router';

class MockApiServiceSuccessCase {
  getUserDetail(userId) {
    const response = {
      items: {
        avatar_url: 'https://avatars3.githubusercontent.com/u/2515796?v=4',
        bio: 'Fascinated to learn new technology',
        blog: 'https://www.linkedin.com/in/gopigoppu/',
        login: 'gopigoppu'
      }

    };
    return response;
  }
}
class MockApiServiceFailureCase {
  getUserDetail(userId) {
    const errRes = {
      errMsg: 'Service is Down'
    };
    return observerErrorStub(errRes);
  }
}

describe('UserRecordService', () => {

  let route: ActivatedRouteSnapshot;

  const tbConfig = {
    providers: [
      { provide: ApiService, useClass: MockApiServiceSuccessCase }
    ]
  };

  beforeEach(() => TestBed.configureTestingModule(tbConfig));

  it('service should be created', () => {
    const service: UserRecordService = TestBed.get(UserRecordService);
    expect(service).toBeTruthy();
  });

  it('should resolve and return response on success scenario', () => {
    const service: UserRecordService = TestBed.get(UserRecordService);
    route = new ActivatedRouteSnapshot();
    route.params = { userid: 'gopigoppu' };
    const responseToVerify: any = service.resolve(route);
    console.log('items ==>', responseToVerify);
    expect(responseToVerify.items.login).toEqual('gopigoppu');
  });
});
