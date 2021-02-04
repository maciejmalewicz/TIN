import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAddressInterceptor } from './utils/http-address-interceptor';
import { HomeComponent } from './menu/home/home.component';
import { OverviewComponent } from './menu/overview/overview.component';
import { KebabRepoService } from './utils/kebab-repo.service';
import { IngredientsPipe } from './menu/overview/ingredients.pipe';
import { PricePipe } from './menu/overview/price.pipe';
import { EditComponent } from './menu/edit/edit.component';
import { EditKebabsComponent } from './menu/edit-kebabs/edit-kebabs.component';
import { EditIngredientsComponent } from './menu/edit-ingredients/edit-ingredients.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    OverviewComponent,
    IngredientsPipe,
    PricePipe,
    EditComponent,
    EditKebabsComponent,
    EditIngredientsComponent,
    LoginComponent,
    RegisterComponent,
    ErrorModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAddressInterceptor, multi: true },
    KebabRepoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
