import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal.component';
import { Ingredient } from 'src/app/models/ingredient';
import { IngredientRepoService } from 'src/app/utils/ingredient-repo.service';
import { KebabRepoService } from 'src/app/utils/kebab-repo.service';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-edit-ingredients',
  templateUrl: './edit-ingredients.component.html',
  styleUrls: ['./edit-ingredients.component.css']
})
export class EditIngredientsComponent implements OnInit {

  constructor(private kebabRepo: KebabRepoService, private ingredientRepo: IngredientRepoService) { }

  @ViewChild("edit") edit: EditComponent;
  @ViewChild("error") modal: ErrorModalComponent;
  ingredients: Array<Ingredient> = [];
  ingredient: Ingredient = null;

  ngOnInit(): void {
    this.ingredientRepo.getUpdates().subscribe(ingredients => this.ingredients = ingredients);
    this.ingredientRepo.getIngredients();
  }

  getName = (ingredient: Ingredient) => {
    return ingredient.name;
  }

  createNewIngredient(){
    return {
      id: -1,
      name: 'New Ingredient',
      type: 'Unknown'
    };
  }

  onItemChange(ingredient: Ingredient){
    if (ingredient != null){
      this.ingredient = Object.assign({}, ingredient);
    } else {
      this.ingredient = null;
    }

  }

  onSave(){
    this.ingredientRepo.updateIngredient(this.ingredient)
    .then(resp => {
      this.kebabRepo.updateIngredientUsages(this.ingredient)
      this.edit.reset();
    }).catch(err => {
      this.modal.open();
    })
  }

  onDelete(){
    this.ingredientRepo.deleteIngredient(this.ingredient.id)
    .then(resp => {
      this.kebabRepo.deleteIngredientUsages(this.ingredient.id);
      this.edit.reset();
    }).catch(err => {
      this.modal.open();
    })
  }

  onCreate(){
    this.ingredientRepo.createIngredient(this.ingredient)
    .catch(err => {
      this.modal.open();
    })
    this.edit.reset();
  }

  onCancel(){
    this.edit.reset();
  }

}
