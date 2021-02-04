import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { AccountData, RegisterData } from 'src/app/models/accountData';
import { Kebab } from 'src/app/models/kebab';
import { AccountDataService } from 'src/app/utils/account-data.service';
import { IngredientRepoService } from 'src/app/utils/ingredient-repo.service';
import { KebabRepoService } from 'src/app/utils/kebab-repo.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private accountDataService: AccountDataService,
    private ingredientRepo: IngredientRepoService, private kebabRepo: KebabRepoService) { }

  @ViewChild("error") modal: ErrorModalComponent;
  accountData: RegisterData = null;

  ngOnInit(): void {
    this.accountDataService.getAccountDataChanges()
    .subscribe(changes => {
      this.accountData = changes;
    });
    this.accountDataService.requestData();

    this.ingredientRepo.getInitErrors().subscribe(resp => this.modal.open());
    this.kebabRepo.getInitErrors().subscribe(resp => this.modal.open());
  }

  isUserOn(page: string){
    let path = this.router.url;
    return path == page;
  }


}
