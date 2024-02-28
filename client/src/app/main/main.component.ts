import {Component, OnInit} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {Content} from "../services/content";
import {ContentService} from "../services/content.service";
import {ActivatedRoute} from "@angular/router";
import {IconsService} from "../services/icon.service";
import {Icons} from "../services/icons";
import {SpotifyService} from "../services/spotify.service";
import {DadJokeService} from "../services/dadJoke.service";

@Component({
  selector: 'app-main',
  template: `
    <ng-container *ngIf="(content$ |async) as content">
    <div id="{{content.sectionId}}" class="section">
      <div  *ngFor="let block of content.contentBlocks" class="{{content.sectionId}}  content_width">
        <div *ngIf="block.image.path" class="img-width"><a href="{{block.image.href}}" target="_blank"> <img class="img-responsive" src="{{block.image.path}}" alt="{{block.subHeader}}">
        </a>
        </div>
          <h2 *ngIf="block.subHeader" class="sub-header"> {{block.subHeader}} </h2>
        <p *ngIf="block.text">{{block.text}} </p>
          <ng-container *ngIf="(icons$|async) as icons">
              <br>
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
    <ng-container *ngIf="!name">
        <hr/>
        <div  class="content_width">
            <p>Random playlist from My personal playlists. Provided using Spotify Web API.</p>
            <div *ngIf="randPlaylist">
                <iframe style="border-radius:12px" [src]="randPlaylist | safe"  width="100%" height="410" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <div *ngIf="(dadJoke$ | async) as dadJoke" style="text-align: center;">
                <p> {{dadJoke.joke}} <br> Joke provided by <a href="https://icanhazdadjoke.com/api" target="_blank">https://icanhazdadjoke.com/api</a></p>
                <button (click)="getRandDadJoke(); getRandPlaylist();" class="btn btn-light" >Refresh</button>
                <p>Will load new random joke and playlist</p>
            </div>
        </div>
    </ng-container>
 `,
  styles: ``
})
export class MainComponent implements OnInit{
  name: string = "";
  content$: Observable<Content>;
  icons$: Observable<Icons>;
  playlists$: Observable<any>;
  randPlaylist: string;
  dadJoke$: Observable<any>;

  constructor(private contentService: ContentService, private route: ActivatedRoute, private iconsService: IconsService, private spotifyService: SpotifyService, private dadJokeService: DadJokeService) {}

   async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(
        params => {
          this.name = params['sectionid'];
          this.getContent(this.name)
            if (!this.name) this.getIcons("Skills")
        }
    )
       this.getRandDadJoke()
       await this.getRandPlaylist()
  }

  getIcons(name: string)  {
     this.icons$ = this.iconsService.getIcons(name)
  }

  private getContent(name: string = "about") {
    this.content$ = this.contentService.getContent(name) ;
  }

    getRandDadJoke() {
        this.dadJoke$ = this.dadJokeService.getRandom()
    }

    async getRandPlaylist(){
        const playlists = await lastValueFrom(await this.spotifyService.getMyPlaylists())
        const randNum = Math.floor(Math.random() * playlists.items.length)
        this.randPlaylist = `https://open.spotify.com/embed/playlist/${playlists.items[randNum].id}?utm_source=generator&theme=0`
        console.log(this.randPlaylist)
    }
}
