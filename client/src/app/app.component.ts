import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="navbar bg-accent font-bold">
      <div class="navbar-start">
        <div class="dropdown dropdown-start">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a [routerLink]="['']" (click)="changeFocus()">About</a></li>
            <li><a [routerLink]="['/main']" [queryParams]="{sectionid:'portfolio'}" (click)="changeFocus()">Portfolio</a></li>
            <li><a [routerLink]="['/resume']" (click)="changeFocus()">Resume</a></li>
            <li><a [routerLink]="['/recipes']" (click)="changeFocus()">Recipes</a></li>
          </ul>
        </div>
      </div>
      <div>
        <a [routerLink]="['']" #me class="btn btn-ghost text-xl">Thomas A Kempton</a>
      </div>
      <div class="navbar-end hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a [routerLink]="['']" >About</a></li>
          <li><a [routerLink]="['/main']" [queryParams]="{sectionid:'portfolio'}">Portfolio</a></li>
          <li><a [routerLink]="['/resume']" >Resume</a></li>
          <li><a [routerLink]="['/recipes']" (click)="changeFocus()">Recipes</a></li>
        </ul>
      </div>
      
    </div>
    <div class="flex flex-col items-center text-center">
      <router-outlet></router-outlet>
      <footer class="footer footer-center mt-10 pb-2 bg-primary text-primary-content">
        <aside>
          <img height="150px" width="150px" src="../assets/icons/pancakes.svg" alt="Pancakes">
           <p>Want to get in touch with me?
            <br>Be it to request more info about myself or my experience,
             <br>to ask for my resume, or random questions about the  
             <br>universe and the meaning of life.
            <br>Feel free to drop me a line anytime. I promise to reply A.S.A.P.
            </p>
        </aside>
        <nav>
          <div class="grid grid-flow-col gap-4">
            <a class="link-secondary" href="https://www.facebook.com/thomas.kem" target="_blank" >FaceBook</a>
            <a class="link-secondary" href="https://www.linkedin.com/in/thomas-a-kempton/" target="_blank"  >LinkedIn</a>
            <a class="link-secondary" href="https://github.com/ThomasAK" target="_blank" >GitHub</a>
            <a class="link-secondary" href="mailto:thomas.a.k.tk@gmail.com">Email</a>
          </div>
        </nav>
        <p>Website built using the MEAN stack Check out the code on GitHub</p>
      </footer>
    </div>
  `,
  styles: []
})
export class AppComponent{
  @ViewChild('me') navMain: ElementRef;
  title = 'Thomas A Kempton';

  changeFocus() {
    this.navMain.nativeElement.focus()
  }
}
