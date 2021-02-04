import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { AccountData } from '../models/accountData';
import { AccountDataService } from '../utils/account-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AccountDataService, private modalService: NgbModal) { }

  @ViewChild("error") modal: ErrorModalComponent;

  accountData: AccountData = {
    login: "",
    password: ""
  }

  ngOnInit(): void {
  }

  onLogIn(){
    this.service.login(this.accountData).catch(err => {
    this.modal.open();
    });
  }
}
