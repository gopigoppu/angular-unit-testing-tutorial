import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserComponent } from './register-user.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { newEvent } from '../../../utt-helpers/index';
import { By } from '@angular/platform-browser';
import { setTimeoutSpy } from '../../../utt-helpers/async-helpers';

describe('RegisterUserComponent', () => {
  let component: RegisterUserComponent;
  let fixture: ComponentFixture<RegisterUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterUserComponent],
      providers: [NgbActiveModal, FormBuilder, SpinnerVisibilityService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should accept input events and submit form, If valid', () => {

    spyOn((component as any).spinner, 'show');
    spyOn((component as any).activeModal, 'dismiss');
    setTimeoutSpy();
    spyOn(window, 'alert');

    expect(component).toBeTruthy();
    const nameInputDL = fixture.debugElement.query(By.css('input[name="firstName"]'));
    nameInputDL.nativeElement.value = 'Gopi';
    nameInputDL.nativeElement.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    expect(component.registerForm.controls.firstName.value).toEqual('Gopi');

    const lastnameInputDL = fixture.nativeElement.querySelector('input[name="lastName"]');
    lastnameInputDL.value = 'Kannan';
    lastnameInputDL.dispatchEvent(newEvent('input'));
    fixture.detectChanges();
    expect(component.registerForm.controls.lastName.value).toEqual('Kannan');

    component.registerForm.controls.email.setValue('contact@beoxi.com');
    expect(component.registerForm.controls.email.value).toEqual('contact@beoxi.com');

    component.registerForm.controls.password.setValue('Password@123');
    expect(component.registerForm.controls.password.value).toEqual('Password@123');
    fixture.detectChanges();
    console.log(component);

    const submitBtn = fixture.nativeElement.querySelector('button.register-btn');
    // click(submitBtn);
    console.log(submitBtn);
    submitBtn.click();

    expect((component as any).spinner.show).toHaveBeenCalled();
    expect((component as any).activeModal.dismiss).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('registered successfully');

    expect(component.f).toEqual(component.registerForm.controls);

  });

  it('should validate email on incorrect format input', () => {
    component.registerForm.controls.email.setValue('contact');
    expect(component.registerForm.controls.email.errors.email).toBeTruthy();
    expect(component.registerForm.controls.email.status).toEqual('INVALID');
    console.log(component);
  });

  it('should validate password on incorrect format input', () => {

    spyOn((component as any).spinner, 'show');
    spyOn((component as any).activeModal, 'dismiss');
    setTimeoutSpy();
    spyOn(window, 'alert');

    const lastnameInputDL = fixture.nativeElement.querySelector('input[name="password"]');
    lastnameInputDL.value = 'Password';
    lastnameInputDL.dispatchEvent(newEvent('input'));
    fixture.detectChanges();

    expect(component.registerForm.controls.password.errors.invalidFormat).toBeTruthy();

    expect(component.registerForm.controls.password.status).toEqual('INVALID');
    console.log(component);

    const submitBtn = fixture.nativeElement.querySelector('button.register-btn');
    // click(submitBtn);
    console.log(submitBtn);
    submitBtn.click();

    expect(component.registerForm.invalid).toBeTruthy();

  });

});
