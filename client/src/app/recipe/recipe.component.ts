import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  template: `
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
        <tr>
          <th>Ingredients</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td></td>
          <td>Quality Control Specialist</td>
          <td>Blue</td>
        </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: ``
})
export class RecipeComponent {

  constructor(
      private router: Router,
      private route: ActivatedRoute,
  ) { }

}
