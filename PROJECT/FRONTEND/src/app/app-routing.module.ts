import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EditIngredientsComponent } from './menu/edit-ingredients/edit-ingredients.component';
import { EditKebabsComponent } from './menu/edit-kebabs/edit-kebabs.component';
import { EditComponent } from './menu/edit/edit.component';
import { HomeComponent } from './menu/home/home.component';
import { MenuComponent } from './menu/menu/menu.component';
import { OverviewComponent } from './menu/overview/overview.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent , children: [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'overview',
      component: OverviewComponent
    },
    {
      path: 'kebabs',
      component: EditKebabsComponent
    },
    {
      path: 'ingredients',
      component: EditIngredientsComponent
    }
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',   redirectTo: '/menu/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
