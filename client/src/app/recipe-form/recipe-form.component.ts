import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  template: `
    <div class="flex flex-col mt-6 p-3 items-center  shadow-[0_0px_10px_-1px_rgba(0,0,0,0.3)] rounded-lg shadow-black p-1">
      <div class="items-center space-y-4">
        <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2">
          Recipe Name
          <input type="text" class="grow" placeholder="Tacos" />
        </label>
        <div class="shadow-[0_0px_10px_-1px_rgba(0,0,0,0.3)] rounded-lg shadow-black p-1">
        <h2>Ingredients</h2>
          <div>
            <form [formGroup]="ingredientForm">
              <div formArrayName="ingredients">
                <div *ngFor="let ingredient of ingredients?.controls; let i = index" [formGroupName]="i" class="space-y-1" >
                  <div class="flex justify-between mt-2">
                    <p>{{i+1}}</p>
                    <div>
                      <button *ngIf="i != 0 || ingredients.length > 1" class="btn btn-sm btn-square btn-outline" (click)="removeForm(ingredients ,i)">
                        -
                      </button>
                      <button class="btn btn-sm btn-square btn-outline" (click)="addForm(ingredients, i)">
                        +
                      </button>
                    </div>
                  </div>
                <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2">
                  Name
                  <input formControlName="name" type="text" class="grow" placeholder="Cheese" />
                </label>
                <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2">
                  Measurement
                  <input formControlName="measurement" type="text" class="grow" placeholder="1 Cup" />
                </label>
              </div>
              </div>
            </form>
          </div>
        </div>
        <div class="shadow-[0_0px_10px_-1px_rgba(0,0,0,0.3)] rounded-lg shadow-black p-1">
        <h2>Instructions</h2>
          <form [formGroup]="instructionForm">
            <div formArrayName="instructions">
              <div *ngFor="let instruction of instructions?.controls; let i = index" [formGroupName]="i" class="space-y-1">
                <div class="flex justify-between mt-2">
                  <p>{{i+1}}</p>
                  <div>
                    <button *ngIf="i != 0 || instructions.length > 1" class="btn btn-sm btn-square btn-outline" (click)="removeForm(instructions, i)">
                      -
                    </button>
                    <button class="btn btn-sm btn-square btn-outline" (click)="addForm(instructions, i)">
                      +
                    </button>
                  </div>
                </div>
                <textarea placeholder="instruction" class="textarea textarea-bordered textarea-sm w-full max-w-xs text-black bg-sky-100" ></textarea>
              </div>
            </div>
          </form>
        </div>
        <textarea placeholder="Description" class="textarea textarea-bordered textarea-sm w-full max-w-xs bg-sky-100 text-black" ></textarea>
        <select class="select select-bordered w-full max-w-xs bg-sky-100 text-black">
          <option disabled selected>Meal</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
        <label class="input input-bordered flex items-center bg-sky-100 text-black gap-2">
          Image URL
          <input type="text" class="grow" placeholder="http://imageURL.com/image" />
        </label>
      </div>
    </div>
  `,
  styles: ``
})
export class RecipeFormComponent {
  ingredient = { name: "", measurement: ""}
  instruction = { text: "" }

  ingredientForm: FormGroup = this.formBuilder.group({
    ingredients: this.formBuilder.array([this.ingredient].map(
        ingredient => this.formBuilder.group(ingredient)
    ))
  });

  instructionForm: FormGroup = this.formBuilder.group({
    instructions: this.formBuilder.array([this.instruction].map(
        instruction => this.formBuilder.group(instruction)
    ))
  });

  constructor(private formBuilder: FormBuilder,) {
  }

  get ingredients(): FormArray {
    return this.ingredientForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.instructionForm.get('instructions') as FormArray;
  }

  addForm(form: FormArray, index: number) {
    form.insert(index + 1, this.formBuilder.group(this.ingredient));
  }

  removeForm(form: FormArray, index: number) {
    if (form.length === 1) return
    form.removeAt(index)
  }

}
