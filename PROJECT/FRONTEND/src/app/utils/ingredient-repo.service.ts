import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { InsertModel } from '../models/insertModel';

@Injectable({
  providedIn: 'root'
})
export class IngredientRepoService {

  constructor(private http: HttpClient) { }

  ingredients: Array<Ingredient> = [];
  private ingredientsSubject = new Subject<Array<Ingredient>>();
  private errorSubject = new Subject<boolean>();

  getUpdates(){
    return this.ingredientsSubject.asObservable();
  }

  private update(){
    this.ingredientsSubject.next(this.ingredients);
  }

  getInitErrors(){
    return this.errorSubject.asObservable();
  }

  private notifyAboutError(){
    this.errorSubject.next(true);
  }

  //lazy loading
  getIngredients(){
     if (this.ingredients.length == 0){
      this.http.get<Array<Ingredient>>("/ingredients").subscribe(resp => {
        this.ingredients = resp;
        console.log(this.ingredients);
        this.update();
      }, err => {
        this.notifyAboutError();
      })
     } else {
      this.update();
     }
  }

  updateIngredient(ingredient: Ingredient): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.requestUpdatingIngredient(ingredient)
      .then(res => {
        this.updateIngredientLocally(ingredient);
        this.update();
        resolve(true);
      })
      .catch(err => reject(false));
    })
  }

  private requestUpdatingIngredient(ingredient: Ingredient){
    return this.http.put("/ingredients", ingredient).toPromise();
  }

  private updateIngredientLocally(ingredient: Ingredient){
    let local = this.ingredients.find(i => i.id == ingredient.id);
    if (local == undefined){
      this.ingredients.push(ingredient);
    } else {
      local.name = ingredient.name;
      local.type = ingredient.type;
    }
  }

  deleteIngredient(id: number){
    return new Promise((resolve, reject) => {
      this.requestDeletingIngredient(id)
      .then(res => {
        this.deleteIngredientLocally(id);
        this.update();
        return resolve(true);
      })
      .catch(err => {
        return reject(false);
      })
    })
  }

  private requestDeletingIngredient(id: number){
    return this.http.delete("/ingredients/" + id).toPromise();
  }

  private deleteIngredientLocally(id: number){
    this.ingredients = this.ingredients.filter(i => i.id != id);
  }

  createIngredient(ingredient: Ingredient){
    return new Promise((resolve, reject) => {
      this.requestCreatingIngredient(ingredient)
      .then(res => {
        this.createIngredientLocally(ingredient, res.id);
        this.update();
        return resolve(true);
      })
      .catch(err => {
        return reject(false);
      })
    })
  }

  private requestCreatingIngredient(ingredient: Ingredient){
    return this.http.post<InsertModel>("/ingredients", ingredient).toPromise();
  }

  private createIngredientLocally(ingredient: Ingredient, id: number){
    ingredient.id = id;
    this.ingredients.push(ingredient);
  }
}
