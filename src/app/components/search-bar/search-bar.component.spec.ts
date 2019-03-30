import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { ApiService } from '../../services/api.service';
import { observerSuccessStub, click } from 'src/utt-helpers';
import { newEvent } from '../../../utt-helpers/index';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ResultCardComponent } from '../result-card/result-card.component';
import { ScoreHeighlightDirective } from '../../directives/score-heighlight.directive';
import { RouterTestingModule } from '@angular/router/testing';

class MockApiServiceSuccessCase {
  getRepos(userId) {
    const res = {
      items: [{
        owner: {
          login: 'gopigoppu'
        },
        forks: 100,
        stargazers_count: 98,
        name: 'Interview Questions',
        score: 99.3
      }
      ]
    };
    return observerSuccessStub(res);
  }
}

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, BrowserModule, RouterTestingModule],
      declarations: [SearchBarComponent, ResultCardComponent, ScoreHeighlightDirective],
      providers: [{ provide: ApiService, useClass: MockApiServiceSuccessCase }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('SearchRepo function should not call apiService.getRepos when searchQuery is empty ', () => {
    // spyOn(ApiService.prototype, 'getRepos').and.callThrough();
    spyOn(component.apiService, 'getRepos').and.callThrough();
    const hostElement = fixture.nativeElement;
    const searchInput: HTMLInputElement = hostElement.querySelector('input.search_input');
    searchInput.value = '';
    searchInput.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    const searchBtn: HTMLInputElement = hostElement.querySelector('div.searchbar a');
    click(searchBtn);
    fixture.detectChanges();
    // expect(ApiService.prototype.getRepos).not.toHaveBeenCalled();
    expect(component.apiService.getRepos).not.toHaveBeenCalled();
  });

  it('search query should render expected result on returned response', () => {
    // spyOn(component.apiService, 'getRepos').and.returnValue(observerSuccessStub(res));
    const hostElement = fixture.nativeElement;
    const searchInput: HTMLInputElement = hostElement.querySelector('input.search_input');
    searchInput.value = 'Interview';
    searchInput.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    const searchBtn: HTMLInputElement = hostElement.querySelector('div.searchbar a');
    click(searchBtn);
    fixture.detectChanges();
    const searchRes: HTMLInputElement = hostElement.querySelector('app-result-card');
    expect(searchRes.textContent).toContain('Interview Questions');
    expect(searchRes.textContent).toContain('Owner : gopigoppu');
    expect(searchRes.textContent).toContain('Forks : 100');
    expect(searchRes.textContent).toContain('Stars : 98');
  });
  it('search query should render expected alert message when it returns empty items response', () => {
    const emptyItemsres = {
      items: []
    };
    spyOn(component.apiService, 'getRepos').and.returnValue(observerSuccessStub(emptyItemsres));
    const hostElement = fixture.nativeElement;
    const searchInput: HTMLInputElement = hostElement.querySelector('input.search_input');
    searchInput.value = 'asdgasdgasgd';
    searchInput.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    const searchBtn: HTMLInputElement = hostElement.querySelector('div.searchbar a');
    click(searchBtn);
    fixture.detectChanges();
    const searchRes: HTMLInputElement = hostElement.querySelector('div.alert-warning');
    expect(searchRes.textContent).toContain('No Repositories Found for given Query! Please try different repository name.');
  });




});
