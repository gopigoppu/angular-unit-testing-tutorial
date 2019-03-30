import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCardComponent } from './result-card.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ScoreHeighlightDirective } from '../../directives/score-heighlight.directive';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { routerStub } from '../../../utt-helpers/activated-route-stub';
import { observerSuccessStub } from '../../../utt-helpers/async-helpers';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResultCardComponent', () => {
  let component: ResultCardComponent;
  let fixture: ComponentFixture<ResultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ResultCardComponent, ScoreHeighlightDirective],
      providers: [
        // { provide: Router, useValue: routerStub() },
        { provide: ActivatedRoute, useValue: { params: observerSuccessStub({}) } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCardComponent);
    component = fixture.componentInstance;

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render with given owner, forks and stars details', () => {
    expect(component).toBeTruthy();
    component.repo = {
      owner: {
        login: 'gopigoppu'
      },
      forks: 100,
      stargazers_count: 98,
      name: 'Interview Questions',
      score: 99.3
    };
    fixture.detectChanges();
    const de: DebugElement = fixture.debugElement;
    const repoNameDe = de.query(By.css('h3.lead'));
    expect(repoNameDe.nativeElement.textContent).toContain('Interview Questions');
    const scoreEl = de.nativeElement.querySelector('div.shape-text');
    console.log(scoreEl);
    expect(scoreEl.innerText).toContain('99');
    const pEl = de.nativeElement.querySelectorAll('p');
    console.log(pEl);
    expect(pEl[0].innerText).toContain('Owner : gopigoppu');
    expect(pEl[1].innerText).toContain('Forks : 100');
    expect(pEl[2].innerText).toContain('Stars : 98');
  });
});
