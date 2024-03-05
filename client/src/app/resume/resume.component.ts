import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  template: `
    <div class="flex flex-col items-center text-center">
    <div>
        <object class="media bg-white" data="/assets/files/Thomas_Kempton_Resume.pdf" type="application/pdf" width="100%">
          <p>Your web browser doesn't have a PDF plugin. You can <a href="/assets/files/Thomas_Kempton_Resume.pdf"> Click here</a> to download my resume.</p>
        </object>
    </div>
    </div>
  `,
  styles: ``
})
export class ResumeComponent {

}
