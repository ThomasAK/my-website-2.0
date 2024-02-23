import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Content} from "../services/content";
import {ContentService} from "../services/content.service";
import {ActivatedRoute} from "@angular/router";
import {IconsService} from "../services/icon.service";
import {Icons} from "../services/icons";

@Component({
  selector: 'app-main',
  template: `
    <ng-container *ngIf="(content$ |async) as content">
    <div id="{{content.name}}" class="section">
      <div  *ngFor="let block of content.contentBlocks" class="{{content.name}}  content_width">
        <h2 *ngIf="block.subHeader" class="sub-header"> {{block.subHeader}} </h2>
        <div *ngIf="block.image.path" class="img-width"><a href="{{block.image.href}}" target="_blank"> <img class="img-responsive" src="{{block.image.path}}" alt="{{block.subHeader}}">
        </a>
        </div>
        <p *ngIf="block.text">{{block.text}} </p>
          <ng-container *ngIf="(icons$|async) as icons">
              <br><br>
              <div *ngIf="block.name === 'Skills'" id="icons">
          <div class="icon" *ngFor="let icon of icons.icons">
              <img height="50px" width="50px" src="{{icon.href}}" alt="{{icon.name}}">
              <p> {{icon.name}} </p>
          </div>
              </div>
          </ng-container>
      </div>
    </div>
    </ng-container>
 `,
  styles: ``
})
export class MainComponent implements OnInit{
  name: string = "";
  content$: Observable<Content> = new Observable<Content>();
  icons$: Observable<Icons> = new Observable<Icons>();

  constructor(private contentService: ContentService, private route: ActivatedRoute, private iconsService: IconsService) {}

   ngOnInit(): void {
    this.route.queryParams.subscribe(
        params => {
          this.name = params['sectionid'];
          this.getContent(this.name)
            if (!this.name) this.getIcons("Skills")

        }
    )
  }

  getIcons(name: string)  {
     this.icons$ = this.iconsService.getIcons(name)
  }

  private getContent(name: string = "about") {
    this.content$ = this.contentService.getContent(name) ;
  }
}
