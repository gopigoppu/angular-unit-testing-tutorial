import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click } from '../../../utt-helpers/index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RegisterUserComponent } from '../../modal/register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [HeaderComponent, RegisterUserComponent],
      providers: [NgbModal]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [RegisterUserComponent],
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render initial header contents - using querySelector', () => {
    console.log(fixture);
    const headerDe: DebugElement = fixture.debugElement;
    const headerEl: HTMLElement = headerDe.nativeElement;
    const navHeader = headerEl.querySelector('div');
    expect(navHeader.textContent).toContain('Angular Unit Test - Beoxi');
  });

  it('should render initial header contents - using Debugelement BY CSS helper', () => {
    console.log(fixture);
    const bannerDe: DebugElement = fixture.debugElement;
    const navHeaderDe = bannerDe.query(By.css('div'));
    expect(navHeaderDe.nativeElement.textContent).toContain('Angular Unit Test - Beoxi');
    const buttonDe = bannerDe.query(By.css('.pointer-cursor'));
    expect(buttonDe.nativeElement.textContent).toContain('Register');
  });

  it('register click should open model popup with title Register New User', () => {
    console.log(fixture);
    const modalRes = {
      componentInstance: {
        title: 'hello'
      }
    };
    spyOn((component as any).modalService, 'open').and.returnValue(modalRes);
    const bannerDe: DebugElement = fixture.debugElement;
    const buttonDe = bannerDe.query(By.css('.pointer-cursor'));
    click(buttonDe);
    expect((component as any).modalService.open).toHaveBeenCalled();
    expect(buttonDe.nativeElement.textContent).toContain('Register');
  });
});
