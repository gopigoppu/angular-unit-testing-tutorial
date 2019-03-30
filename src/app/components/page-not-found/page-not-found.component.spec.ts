import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with expected error message', () => {
    expect(component).toBeTruthy();
    const de: DebugElement = fixture.debugElement;
    const errMsgDe = de.query(By.css('div.lead'));
    expect(errMsgDe.nativeElement.textContent).toContain('Oops! We can\'t seem to find the page you are looking for');
  });
});
