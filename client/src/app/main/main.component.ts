import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Content} from "../content";
import {ContentService} from "../content.service";

@Component({
  selector: 'app-main',
  template: `
    <div id="{{content$.name}}" class="section content-toDisplay content-toDisplay--active">
      <div>
        <h2 class="sub-header"> {{content$.name}} </h2>
      </div>
      <div *ngFor="let block of content$.contentBlocks  | async" class="content_width">
        <h2 class="sub-header"> {{block.subHeader}} </h2>
        <div class="img-width"><a href="{{block.image.href}}" target="_blank"> <img class="img-responsive thumbnail" src="{{block.image.path}}">
        </a>
        </div>
        <p>{{block.text}}</p>
        
      </div>
    </div>
 `,
  styles: ``
})
export class MainComponent {
  content$: Observable<Content> = new Observable();
  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
    this.content$ = this.getContent('me')
  }

  private getContent(name): Observable<Content> {
    return this.contentService.getContent(name) ;
  }
}
