import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { ResumeComponent } from './resume/resume.component';
import { SafePipe } from './safe.pipe';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeNavComponent } from './recipe-nav/recipe-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ResumeComponent,
    SafePipe,
    RecipesComponent,
    RecipeComponent,
    RecipeFormComponent,
    RecipeNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
