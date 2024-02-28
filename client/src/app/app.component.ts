import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-fixed-top">
      <div class="navbar-header">
        <a class="navbar-brand center">Thomas A  Kempton</a>
      </div>
      <button class="navbar-toggler" type="button" (click)="toggleNavbarCollapsing()">&#9776;
      </button>
      <div class="navbar-collapse justify-content-end" [class.collapse]="navbarCollapsed" >
        <div class="navbar-nav">
          <a [routerLink]="['']" class="nav-item nav-link" type="button" (click)="toggleNavbarCollapsing()">About</a>
          <a [routerLink]="['/main']" [queryParams]="{sectionid:'portfolio'}" class="nav-item nav-link" type="button" (click)="toggleNavbarCollapsing()">Portfolio</a>
          <a [routerLink]="['/resume']" class="nav-item nav-link" type="button" (click)="toggleNavbarCollapsing()">Resume</a>
          <!-- 
          rebuild coming soon. 
          <div class="dropdown">
            <a class="dropdown nav-link">School Projects<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="Recipes/RecipeIndex.html">HTML</a></li>
              <li><a href="School/PHPPage/WhoAmI.php">PHP</a></li>
              <li><a href="School/MySql/MySql.php">MySql</a></li>
              <li><a href="School/Java/Form.php">Java</a></li>
              <li><a href="School/Final/LoginForm.php">Final</a></li>
            </ul> 
          </div> -->
        </div> 
      </div>
    </nav>
    <div class="container-md">
      <router-outlet></router-outlet>
      <hr/>
    <div id="Contact" class="contactMe">
      <div>
        <h2 class="sub-header"> Contact Me</h2>
      </div>
      <div>
        <p> Want to get in touch with me? Be it to request more info about myself or my experience, to ask for my resume, or random questions about the universe and the meaning of life. Feel free to drop me a line anytime.
          I promise to reply A.S.A.P. <br><br>
          <a href="https://www.facebook.com/thomas.kem" target="_blank" class="btn btn-light" role="button">FaceBook</a>
          <a href="https://www.linkedin.com/in/thomas-a-kempton/" target="_blank" class="btn btn-light" role="button">LinkedIn</a>
          <a href="https://github.com/ThomasAK" target="_blank" class="btn btn-light" role="button">GitHub</a>
          <br> <br><strong> Email - Thomas.a.k.tk&#64;gmail.com </strong>
          <br> Website built using the MEAN stack Check out the code on GitHub
        </p>
      </div>
    </div>
    </div>
  `,
  styles: []
})
export class AppComponent{
  title = 'Thomas Kempton';
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
}
