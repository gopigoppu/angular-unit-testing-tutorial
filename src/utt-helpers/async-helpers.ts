import { defer, Observable, of, throwError } from 'rxjs';
import { Params } from '@angular/router';

/** Create async observable that emits-once and completes after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

/** Create async observable error that errors after a JS engine turn */
export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

export function observerSuccessStub(value: any): Observable<Params> {
  return of(value);
}
export function observerErrorStub(value: any): Observable<Params> {
  return throwError(value);
}

export function setTimeoutSpy() {
  const spy = spyOn(window, 'setTimeout');
  spy.and.callFake((callBack?, waitTime?) => {
    if (callBack) {
      return callBack();
    }
  });
}
