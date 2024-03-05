import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../services/recipes";
import {lastValueFrom, Observable} from "rxjs";
import {RecipeService} from "../services/recipe.service";

@Component({
  selector: 'app-recipe-form',
  template: `
    <div class="flex justify-center text-center ">
      <form [formGroup]="recipeForm">
        <div class="flex flex-col mt-6 p-3 items-center  shadow-[0_0px_10px_-1px_rgba(0,0,0,0.3)] rounded-lg shadow-black  p-6">
          <div class="items-center space-y-4">
            <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2 mx-2 ">
              Recipe Name 
              <input formControlName="recipe" type="text" class="grow border-b-2 border-slate-400" placeholder="Tacos" />
            </label>
            <div class="border-b-2 border-l-2 border-red-300 rounded-lg p-1">
            <h2>Ingredients</h2>
              <div>
                  <div formArrayName="ingredients">
                    <div *ngFor="let ingredient of ingredients?.controls; let i = index" [formGroupName]="i" class="space-y-1 p-1" >
                      <div class="flex justify-between mt-1">
                        <p>{{i+1}}</p>
                        <div class="space-x-1">
                          <button *ngIf="i != 0 || ingredients.length > 1" class="btn btn-sm btn-square btn-outline" (click)="removeForm(ingredients ,i)"> - </button>
                          <button class="btn btn-sm btn-square btn-outline" (click)="addForm(ingredients, i, ingredient$)"> + </button>
                        </div>
                      </div>
                    <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2">
                      Name 
                      <input formControlName="name" type="text" class="grow border-b-2 border-slate-400 " placeholder="Cheese" />
                    </label>
                    <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2">
                      Measurement
                      <input formControlName="measurement" type="text" class="grow border-b-2 border-slate-400 " placeholder="1 Cup" />
                    </label>
                  </div>
                  </div>
              </div>
            </div>
            <div class="rounded-lg border-red-300 border-b-2 border-l-2 p-2">
            <h2>Instructions</h2>
                <div formArrayName="instructions">
                  <div *ngFor="let instruction of instructions?.controls; let i = index" [formGroupName]="i" class="space-y-1">
                    <div class="flex justify-between mt-2">
                      <p>{{i+1}}</p>
                      <div class="space-x-1">
                        <button *ngIf="i != 0 || instructions.length > 1" class="btn btn-sm btn-square btn-outline" (click)="removeForm(instructions, i)"> - </button>
                        <button class="btn btn-sm btn-square btn-outline" (click)="addForm(instructions, i, instruction$)"> + </button>
                      </div>
                    </div>
                    <textarea formControlName="text"  placeholder="instruction" class="textarea textarea-bordered textarea-sm w-full max-w-xs text-black bg-sky-100" maxlength="250"></textarea>
                  </div>
                </div>
            </div>
            <h2>Description</h2>
            <textarea formControlName="description" placeholder="Description" class="textarea textarea-bordered textarea-sm w-full max-w-xs bg-sky-100 text-black" maxlength="250" ></textarea>
            <select formControlName="meal" class="select select-bordered w-full max-w-xs bg-sky-100 text-black">
              <option disabled selected>Meal</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
            <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2 mx-2">
              Image URL
              <input formControlName="path" type="text" class="grow border-b-2 border-slate-400 " placeholder="http://imageURL.com/image" />
            </label> 
            <button *ngIf="!recipe.locked" class="btn btn-outline" (click)="addOrUpdateRecipe()" > Submit </button>
          </div>
        </div>
      </form>
    </div>
  `,
  styles: ``
})
export class RecipeFormComponent {
  ingredient$ = { name: "", measurement: ""}
  instruction$ = { text: "" }

  recipeForm: FormGroup = this.formBuilder.group({recipe: ""});
  recipe: Recipe = {
    name: "",
    description: "",
    ingredients: [{name: "", measurement: ""}],
    instructions: [""],
    locked: false,
    meal: "Meal",
    path: ""
  };

  id: string | null;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!sessionStorage.getItem('time')) {
      sessionStorage.setItem('time', new Date(2018, 11, 24, 10, 33, 30, 0).toString());
    }
    console.log(this.id)
  }

  async ngOnInit() {
    if (this.id) {
      this.recipe = await lastValueFrom(this.recipeService.getRecipe(this.id))
      if (this.recipe.locked) alert("This recipe can't be changed! But feel free to play with this page.")
    }
    this.recipeForm = this.formBuilder.group({
      recipe: [this.recipe.name],
      ingredients: this.formBuilder.array(this.recipe.ingredients.map(
          ingredient => this.formBuilder.group(ingredient)
      )),
      instructions: this.formBuilder.array(this.recipe.instructions.map(
          instruction =>  this.formBuilder.group({text: instruction})
      )),
      description: [this.recipe.description],
      meal: [this.recipe.meal],
      path: [this.recipe.path]
    });
    console.log(this.recipeForm)
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addForm(form: FormArray, index: number, type: any) {
    form.insert(index + 1, this.formBuilder.group(type));
    console.log(this.instructions.value.map((instruction: any) => {return instruction.text}))
  }

  removeForm(form: FormArray, index: number) {
    if (form.length === 1) return
    form.removeAt(index)
  }

  getRecipeFromForm(){
    return {
      name: this.recipeForm.get('recipe')?.value,
      ingredients: this.ingredients.value,
      instructions: this.instructions.value.map((instruction: any) => {return instruction.text}),
      description: this.recipeForm.get('description')?.value,
      meal: this.recipeForm.get('meal')?.value,
      path: this.recipeForm.get('path')?.value,
      locked: this.recipe.locked
    }
  }

  createRecipe(){
    if (this.recipe.locked) return
    this.recipeService.createRecipe(this.getRecipeFromForm())
        .subscribe( {
          next: (value) => {
            this.router.navigate(['/recipe/',value]);
          },
          error: (error) => {
            alert("Failed to update employee");
            console.error(error);
          }
        });
  }

  updateRecipe(){
    if (this.recipe.locked) return
    this.recipeService.updateRecipe(this.id, this.getRecipeFromForm()).subscribe( {
      next: () => {
        this.router.navigate(['/recipe/',this.id]);
      },
      error: (error) => {
        alert("Failed to update recipe");
        console.error(error);
      }
    });
  }

  addOrUpdateRecipe(){
    if (new Date(sessionStorage.getItem('time')!.toString()).getMilliseconds() < new Date().getMilliseconds() - 30000) return alert("You can only add or update every 30 seconds.")
    if (this.id){
      this.updateRecipe()
    }else {
      this.createRecipe()
    }
  }

}
