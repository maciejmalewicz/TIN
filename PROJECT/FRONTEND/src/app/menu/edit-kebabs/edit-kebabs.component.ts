import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientUsage } from 'src/app/models/ingredient_usage';
import { Kebab } from 'src/app/models/kebab';
import { Price } from 'src/app/models/price';
import { IngredientRepoService } from 'src/app/utils/ingredient-repo.service';
import { KebabRepoService } from 'src/app/utils/kebab-repo.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-edit-kebabs',
  templateUrl: './edit-kebabs.component.html',
  styleUrls: ['./edit-kebabs.component.css']
})
export class EditKebabsComponent implements OnInit {

  constructor(private kebabRepo: KebabRepoService, private ingredientRepo: IngredientRepoService) { }

  @ViewChild("edit") edit: EditComponent;
  @ViewChild("error") modal: ErrorModalComponent;
  kebabs: Array<Kebab> = [];
  ingredients: Array<Ingredient> = [];

  kebab: Kebab = null;
  price: Price = {
    primary: 15,
    secondary: 0
  }

  currentlyEdited = -1;

  getName = (kebab: Kebab) => {
    return kebab.meal_name;
  }

  ngOnInit(): void {
    this.ingredientRepo.getUpdates().subscribe(ingredients => this.ingredients = ingredients);
    this.ingredientRepo.getIngredients();

    this.kebabRepo.getUpdates().subscribe(kebabs => this.kebabs = kebabs);
    this.kebabRepo.getKebabs();
  }

  onItemChange(item: Kebab){
    this.kebab = item;
    if (item != null){
      this.price = {
        primary: Math.floor(this.kebab.meal_cost / 100),
        secondary: this.kebab.meal_cost % 100
      }
    }
  }

  onPriceChange(){
    this.kebab.meal_cost = this.price.primary * 100 + this.price.secondary;
  }

  createNewKebab(){
    return {
      id: -1,
      meal_name: 'New Kebab',
      meal_cost: 1500,
      ingredients: [],
      meal_description: 'Add description here'
    }
  }

  onSave(){
    this.updateKebabIngredientModels();
    this.kebabRepo.updateKebab(this.kebab)
    .then(resp => {
      this.updateKebabIngredientModels();
      this.edit.reset();
      this.currentlyEdited = -1;
    })
    .catch(err => {
      this.modal.open();
    })
  }

  onDelete(){
    this.kebabRepo.deleteKebab(this.kebab.id)
    .then(res => {
      this.edit.reset();
    }).catch(err => {
      this.modal.open();
    })
  }

  onCreate(){
    this.updateKebabIngredientModels();
    this.kebabRepo.createKebab(this.kebab)
    .then(resp => {
      console.log(this.kebab);
      this.edit.reset();
      this.currentlyEdited = -1;
    }).catch(err => {
      this.modal.open();
    })
  }

  onCancel(){
    this.edit.reset();
    this.currentlyEdited = -1;
  }

  onEdit(usageIndex: number){
    if (this.currentlyEdited == usageIndex){
      this.currentlyEdited = -1;
    } else {
      this.currentlyEdited = usageIndex;
    }
  }

  onDeleteIngredient(event, usage: IngredientUsage){
    this.kebab.ingredients = this.kebab.ingredients.filter(u => u != usage);
    this.currentlyEdited = -1;
  }

  canAddIngredient(){
    return this.ingredients.length > 0;
  }

  onAddIngredient(){
    let ingr = this.ingredients[0];
    let ingredient: IngredientUsage = {
      id: ingr.id,
      amount: "MEDIUM",
      ingredient_name: ingr.name,
      ingredient_type: ingr.type
    }
    this.kebab.ingredients.push(ingredient);
    this.onEdit(this.kebab.ingredients.length - 1);
  }

  updateKebabIngredientModels(){
    this.kebab.ingredients.forEach(i => {
      let fromRepo = this.ingredients.find(ing => ing.name == i.ingredient_name);
      if (fromRepo != undefined){
        i.id = fromRepo.id;
        i.ingredient_type = fromRepo.type;
      }
    })
  }

}
