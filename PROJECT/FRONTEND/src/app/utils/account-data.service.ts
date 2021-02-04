import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AccountData, LoginModel, RegisterData } from '../models/accountData';
import { InsertModel } from '../models/insertModel';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {

  constructor(private http: HttpClient, private router: Router) { }

  accountData: RegisterData;
  accountDataSubject = new Subject<RegisterData>();

  getAccountDataChanges(){
    return this.accountDataSubject.asObservable();
  }

  requestData(){
    this.update();
  }

  private update(){
    this.accountDataSubject.next(this.accountData);
  }

  registerUser(data: RegisterData){
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<InsertModel>("/users", data).toPromise()
      .then(resp => {
        if (resp.status == 200){
          this.accountData = data;
          this.update();
          this.redirectToMenu();
          return resolve(true);
        } else {
          return reject(false);
        }
      })
    })
  }

  private redirectToMenu(){
    this.router.navigateByUrl("/menu/home");
  }

  // login(data: AccountData){
  //   this.http.post<LoginModel>("/login", data)
  //   .subscribe(resp => {
  //     if (resp.status == 200){
  //       this.accountData = {
  //         login: data.login,
  //         password: data.password,
  //         firstName: resp.firstName,
  //         lastName: resp.lastName
  //       }
  //       this.update();
  //       this.redirectToMenu();
  //     }
  //   });
  // }

  login(data: AccountData){
    return new Promise<boolean>((resolve, reject) => {
      return this.http.post<LoginModel>("/login", data).toPromise()
      .then(resp => {
        if (resp.status == 200){
          this.accountData = {
            login: data.login,
            password: data.password,
            firstName: resp.firstName,
            lastName: resp.lastName
          }
          this.update();
          this.redirectToMenu();
          return resolve(true);
        } else {
          return reject(false);
        }
      });
    })
  }

}
