import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  template: `
    <div id="Resume" class="section content-toDisplay resume">
      <div>
        <embed src="/assets/files/Thomas_Kempton_Resume.pdf" width="100%" height="750rem" />
      </div>
    </div>
  `,
  styles: ``
})
export class ResumeComponent {

}
