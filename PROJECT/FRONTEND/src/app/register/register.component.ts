import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { RegisterData } from '../models/accountData';
import { AccountDataService } from '../utils/account-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: AccountDataService) { }

  @ViewChild("error") modal: ErrorModalComponent;

  accountData: RegisterData = {
    firstName: "",
    lastName: "",
    login: "",
    password: ""
  }

  ngOnInit(): void {
  }

  onRegister(){
    this.service.registerUser(this.accountData).catch(err => {
      this.modal.open();
    })
  }

}
