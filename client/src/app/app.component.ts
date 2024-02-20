import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="navbar-header ">
        <a class="navbar-brand">Thomas Kempton</a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarToggler">
        <div class="navbar-nav float-lg-right float-xl-right justify-content-sm-center">
          <a class="nav-item nav-link" type="button">About</a>
          <a class="nav-item nav-link" type="button">Portfolio</a>
          <a class="nav-item nav-link" type="button">Contact</a>
          <a class="nav-item nav-link" type="button">Resume</a>
          <div class="dropdown">
            <a class="dropdown nav-link">School Projects<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="Recipes/RecipeIndex.html">HTML</a></li>
              <li><a href="School/PHPPage/WhoAmI.php">PHP</a></li>
              <li><a href="School/MySql/MySql.php">MySql</a></li>
              <li><a href="School/Java/Form.php">Java</a></li>
              <li><a href="School/Final/LoginForm.php">Final</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container-md">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Thomas Kempton';
}
