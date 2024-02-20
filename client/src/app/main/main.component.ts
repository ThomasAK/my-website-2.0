import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Content} from "../content";
import {ContentService} from "../content.service";

@Component({
  selector: 'app-main',
  template: `
   
 `,
  styles: ``
})
export class MainComponent {
  content$: Observable<Content[]> = new Observable();

  constructor(private employeesService: ContentService) { }

  ngOnInit(): void {
    this.fetchContent();
  }

  private fetchContent(): void {
    this.content$ = this.employeesService.getAllContent();
  }
}
