import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { ResumeComponent } from "./resume/resume.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { RecipesComponent } from "./recipes/recipes.component";



const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'resume', component: ResumeComponent},
  { path: 'recipes', component: RecipesComponent},
  { path: 'recipes/:_id', component: RecipeComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }