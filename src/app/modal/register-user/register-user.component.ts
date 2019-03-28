import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { CustomValidator } from '../../validators/customValidator';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  public title: any = 'Register New User';
  registerForm: FormGroup;
  submitted = false;


  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private spinner: SpinnerVisibilityService) { }


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), CustomValidator.passwordValidator]]
    });
  }

  get f() { return this.registerForm.controls; }


  registerUser() {
    console.log(this.registerForm);
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value));
      this.activeModal.dismiss();
    }, 3000);




  }

}
