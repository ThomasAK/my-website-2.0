import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from "../services/recipe.service";
import { Observable } from "rxjs";
import { Recipe } from "../services/recipes";

@Component({
  selector: 'app-recipe',
  template: `
    <ng-container *ngIf="(recipe$ | async) as recipe">
      <div  class="hero rounded-lg shadow-xl ">
        <div class="hero-content flex-col lg:flex-row " >
          <img class="max-w-sm rounded-lg shadow-xl shadow-indigo-500/50" src="{{recipe.path}}" alt="{{recipe.name}}"> 
          <div>
            <h2 class="sub-header font-bold text-xl"> {{recipe.name}} </h2>
            <p *ngIf="recipe.description">{{recipe.description}} </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col lg:flex-row items-center lg:justify-around pt-6">
        <div class="overflow-x-auto w-3/4 lg:w-1/4">
          <table class="table">
            <thead>
            <tr>
              <th>Ingredients</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let ingredient of recipe.ingredients">
              <td>{{ingredient.name}}</td>
              <td>{{ingredient.amount}}   {{ingredient.measurement}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="pt-12 w-3/4 lg:w-2/4 text-start">
          <div *ngFor="let instruction of recipe.instructions; index as i">
            <p>{{i+1}}: <span class="pr-6"></span> {{instruction}}</p>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styles: ``
})
export class RecipeComponent implements OnInit{
  recipe$: Observable<Recipe>;
  num = 1;
  constructor( private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
    } else {
      this.recipe$ = this.recipeService.getRecipe(id)
    }
  }

}
