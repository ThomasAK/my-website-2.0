import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-recipe-nav',
  template: `
    <div class="flex justify-center bg-violet-950 navbar bg-base-100">
      <div class="navbar-start hidden lg:flex">
        <div>
          <a [routerLink]="['/recipes/']" class="btn btn-ghost text-xl">Recipes</a>
        </div>
        <div class="">
          <a [routerLink]="'/recipe/add/'" class="btn btn-ghost text-xl">Add Recipe</a>
        </div>
      </div>
      <div class="navbar-end gap-2">
        <div [formGroup]="navForm" class="form-control">
          <input formControlName="search" type="text" placeholder="Search Currently Disabled" class="input input-bordered w-24 md:w-auto" />
        </div>
        <div>
          <a [routerLink]="['/recipes/', navForm.get('search')!.value]" class="btn btn-ghost text-xl">Search</a>
        </div>
      </div>
      <div class="dropdown dropdown-end lg:hidden">
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box">
          <li><a [routerLink]="'/recipes/'" class="btn btn-ghost">Recipes</a></li>
          <li><a [routerLink]="'/recipe/add/'" class="btn btn-ghost">Add Recipe</a></li>
        </ul>
        <div tabindex="0" role="button" class="btn btn-ghost ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class RecipeNavComponent {
  navForm: FormGroup = this.formBuilder.group({search: ""})

  constructor(private formBuilder: FormBuilder) {
  }
}
