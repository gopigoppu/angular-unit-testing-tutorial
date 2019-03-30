import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ScoreHeighlightDirective } from './score-heighlight.directive';
import { By } from '@angular/platform-browser';
@Component({
  selector: 'app-dynamic-cmp',
  template: `<div class="offer" [appScoreHeighlight]="score">
  Score : {{score}}
  </div>`
})
export class DynamicComponent implements OnInit {

  @Input() score: any;
  constructor() {
  }

  ngOnInit() {
  }

}


describe('Score Heighlight Directive', () => {
  let component: DynamicComponent;
  let fixture: ComponentFixture<DynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicComponent, ScoreHeighlightDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicComponent);
    component = fixture.componentInstance;
  });

  it('should create compoent', () => {
    expect(component).toBeTruthy();
  });

  it('directive should add class of offer-success when score is greater than 80', () => {
    component.score = 83;
    fixture.detectChanges();
    const scoreEl = fixture.debugElement.query(By.css('div.offer'));
    console.log(scoreEl.nativeElement.classList);
    expect(scoreEl.nativeElement.classList).toContain('offer-success');
  });
  it('directive should add class of offer-info when score is greater than 50 and less than 80', () => {
    component.score = 53;
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    const scoreEl = fixture.debugElement.query(By.css('div.offer'));
    console.log(scoreEl.nativeElement.classList);
    expect(scoreEl.nativeElement.classList).toContain('offer-info');
  });
  it('directive should add class of offer-primary when score is greater than 30 and less than 50', () => {
    component.score = 43;
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    const scoreEl: HTMLInputElement = hostElement.querySelector('div.offer');
    console.log(scoreEl.classList);
    expect(scoreEl.classList).toContain('offer-primary');
  });
  it('directive should add class of offer-warning when score is greater than 10 and less than 30', () => {
    component.score = 23;
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    const scoreEl: HTMLInputElement = hostElement.querySelector('div.offer');
    console.log(scoreEl.classList);
    expect(scoreEl.classList).toContain('offer-warning');
  });
  it('directive should add class of offer-danger when score is less than 10', () => {
    component.score = 3;
    fixture.detectChanges();
    const hostElement = fixture.nativeElement;
    const scoreEl: HTMLInputElement = hostElement.querySelector('div.offer');
    console.log(scoreEl.classList);
    expect(scoreEl.classList).toContain('offer-danger');
  });

});
