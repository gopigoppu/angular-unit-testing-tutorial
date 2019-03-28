import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterUserComponent } from '../../modal/register-user/register-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  register() {
    console.log('register click');
    const modalRef = this.modalService.open(RegisterUserComponent, { size: 'lg' });
    modalRef.componentInstance.title = 'Register New User';
  }

}
