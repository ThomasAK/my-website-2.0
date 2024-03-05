import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipes',
  template: `
    <ng-container *ngIf="(recipes$ |async) as recipes">
        <app-recipe-nav></app-recipe-nav>
        <div class=" flex flex-wrap justify-center">
          <div *ngFor="let recipe of recipes" class="space-y-8 pt-8 px-12">
              <a [routerLink]="['/recipe/', recipe._id]">
              <div class="card w-96 bg-base-100 shadow-xl">
                  <figure><img src="{{recipe.path}}" alt="{{recipe.name}}" style=" height: 300px"/></figure>
                  <div class="card-body">
                      <h2 class="card-title"> {{recipe.name}} </h2>
                      <p *ngIf="recipe.description"> {{recipe.description}} </p>
                  </div>
              </div>
              </a>
          </div>
        </div>
    </ng-container>
  `,
  styles: ``
})
export class RecipesComponent {
    recipes$: Observable<any>;

    constructor(private recipeService: RecipeService) {
        this.getRecipes()
    }

    getRecipes(){
      this.recipes$ = this.recipeService.getAllRecipes()
    }
}
