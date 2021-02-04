import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { InsertModel } from '../models/insertModel';
import { Kebab } from '../models/kebab';
import { KebabInsertModel, KebabUpdateModel, KebabUpdateModelIngredient } from '../models/kebabUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class KebabRepoService {

  constructor(private http: HttpClient) { }

  kebabs: Array<Kebab> = [];
  private kebabsSubject = new Subject<Array<Kebab>>();
  private errorSubject = new Subject<boolean>();

  getInitErrors(){
    return this.errorSubject.asObservable();
  }

  private notifyAboutError(){
    this.errorSubject.next(true);
  }

  getUpdates(){
    return this.kebabsSubject.asObservable();
  }

  private update(){
    this.kebabsSubject.next(this.kebabs);
  }

  //lazy loading
  getKebabs(){
    if (this.kebabs.length == 0){
      this.http.get<Array<Kebab>>("/kebab").subscribe(resp => {
        this.kebabs = resp;
        this.update();
        console.log(this.kebabs);
      }, err => {
      })
    } else {
      this.update();
    }
  }

  deleteKebab(id: number){
    return new Promise((resolve, reject) => {
      this.requestDeletingKebab(id)
      .then(res => {
        this.deleteKebabLocally(id);
        this.update();
        return resolve(true);
      })
      .catch(err => {
        return reject(false);
      })
    })
  }

  private deleteKebabLocally(id: number) {
    this.kebabs = this.kebabs.filter(k => k.id != id);
  }

  private requestDeletingKebab(id: number) {
    return this.http.delete("/kebab/" + id).toPromise();
  }

  createKebab(kebab: Kebab){
    return new Promise((resolve, reject) => {
      this.requestCreatingKebab(kebab)
      .then(res => {
        this.createKebabLocally(kebab, res.id);
        this.update();
        return resolve(true);
      })
      .catch(err => {
        return reject(false);
      })
    })
  }

  private createKebabLocally(kebab: Kebab, id: number) {
    kebab.id = id;
    this.kebabs.push(kebab);
  }

  private requestCreatingKebab(kebab: Kebab) {
    let request = this.kebabToRequest(kebab);
    return this.http.post<InsertModel>("/kebab", request).toPromise();
  }

  updateKebab(kebab: Kebab): Promise<boolean>{
    console.log(kebab);
    return new Promise((resolve, reject) => {
      this.requestUpdatingKebab(kebab)
      .then(res => {
        this.updateKebabLocally(kebab);
        this.update();
        return resolve(true);
      })
      .catch(err => reject(false));
    })
  }

  updateKebabLocally(kebab: Kebab) {
    let local = this.kebabs.find(k => k.id == kebab.id);
    if (local != undefined){
      local.ingredients = kebab.ingredients;
      local.meal_cost = kebab.meal_cost;
      local.meal_description = kebab.meal_description;
      local.ingredients = kebab.ingredients;
    }
  }

  requestUpdatingKebab(kebab: Kebab) {
    let request = this.kebabToRequest(kebab) as KebabUpdateModel;
    request.id = kebab.id;
    return this.http.put("/kebab", request).toPromise();
  }

  private kebabToRequest(kebab: Kebab): KebabInsertModel{
    return {
      name: kebab.meal_name,
      cost: kebab.meal_cost,
      description: kebab.meal_description,
      ingredients: kebab.ingredients.map(i => {
        return {
          id: i.id,
          amount: i.amount
        }
      })
    }
  }


  //ingredient editing

  updateIngredientUsages(ingredient: Ingredient){
    this.kebabs.forEach(kebab => {
      let usage  = kebab.ingredients.find(i => i.id == ingredient.id);
      if (usage != undefined){
        usage.ingredient_name = ingredient.name;
        usage.ingredient_type = ingredient.type;
      }
    })
    this.update();
  }

  deleteIngredientUsages(id: number){
    this.kebabs.forEach(kebab => {
      kebab.ingredients = kebab.ingredients.filter(i => i.id != id);
    });
    this.update();
  }
}
