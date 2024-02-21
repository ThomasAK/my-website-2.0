import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Content} from "../content";
import {ContentService} from "../content.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  template: `
    <ng-container *ngIf="(content$ |async) as content">
    <div id="{{content.name}}" class="section">
      <div>
        <h2 class="sub-header"> {{content.name}} </h2> 
      </div>
      <div  *ngFor="let block of content.contentBlocks" class="{{content.name}}  content_width">
        <h2 class="sub-header"> {{block.subHeader}} </h2>
        <div *ngIf="block.image.path" class="img-width"><a href="{{block.image.href}}" target="_blank" class="thumbnail"> <img class="img-responsive" src="{{block.image.path}}" alt="{{block.subHeader}}">
        </a>
        </div>
        <p>{{block.text}}</p>
        
      </div>
    </div>
    </ng-container>
 `,
  styles: ``
})
export class MainComponent implements OnInit{
  name: string = "";
  content$: Observable<Content> = new Observable<Content>();
  constructor(private contentService: ContentService, private route: ActivatedRoute) {}

   ngOnInit(): void {
    this.route.queryParams.subscribe(
        params => {
          this.name = params['name'];
          this.getContent(this.name)
        }
    )
  }

  private getContent(name: string = "About") {
    this.content$ = this.contentService.getContent(name) ;
  }
}
