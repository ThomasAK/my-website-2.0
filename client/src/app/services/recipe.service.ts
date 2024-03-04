import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Recipe } from './recipes';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipes$: Subject<Recipe[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshRecipes() {
        this.httpClient.get<Recipe[]>(`/api/recipe`)
            .subscribe(Recipe => {
                this.recipes$.next(Recipe);
            });
    }

    getAllRecipes(): Subject<Recipe[]> {
        this.refreshRecipes();
        return this.recipes$;
    }

    getRecipe(id: string | null): Observable<Recipe> {
        return this.httpClient.get<Recipe>(`/api/recipe/${id}`);
    }

    createRecipe(recipe: Recipe): Observable<string> {
        return this.httpClient.post('/api/recipe', recipe, { responseType: 'text' })
    }

    updateRecipe(id: string, recipe: Recipe): Observable<string> {
        return this.httpClient.put(`/recipe/${id}`, recipe, { responseType: 'text' });
    }

    deleteRecipe(id: string): Observable<string> {
        return this.httpClient.delete(`/recipe/${id}`, { responseType: 'text' });
    }
}