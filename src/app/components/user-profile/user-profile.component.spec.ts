import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { ActivatedRoute } from '@angular/router';
import { observerSuccessStub } from '../../../utt-helpers/async-helpers';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  const data = {
    items: {
      name: 'Gopi',
      avatar_url: 'http://www.beoxi.com',
      bio: 'Angular Developer',
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { data } } }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create compoent', () => {
    expect(component).toBeTruthy();
  });

  it('component should render with resolved user deatils', () => {
    const hostElement = fixture.nativeElement;
    const userNameEl: HTMLInputElement = hostElement.querySelector('h4.card-title');
    expect(userNameEl.textContent).toContain('Gopi');
    const userBioEl: HTMLInputElement = hostElement.querySelector('p.card-text');
    expect(userBioEl.textContent).toContain('Angular Developer');
  });
});
