import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipes',
  template: `
    <ng-container *ngIf="(recipes$ |async) as recipes">
        <div class=" flex flex-wrap ">
        <div  class="space-y-8 pt-8 px-12">
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMTVfYnVpbGRpbmdfY29uc3RydWN0aW9uX2lzb2xhdGVkX29uX3doaXRlX2JhY2tncl83YTI3MWEwZi02NjQxLTQ5NDAtOTI2OC05MTdjZDNjYjQ5MmUucG5n.png" alt="construction"/></figure>
                <div class="card-body">
                    <h2 class="card-title"> Page under construction  </h2>
                    <p> </p>
                </div>
            </div>
        </div>
      <div *ngFor="let recipe of recipes" class="space-y-8 pt-8 px-12">
          <a [routerLink]="['/recipes/', recipe._id]">
          <div class="card w-96 bg-base-100 shadow-xl">
              <figure><img src="{{recipe.path}}" alt="{{recipe.name}}"/></figure>
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
