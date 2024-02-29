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
    <div id="{{content.sectionId}}" class="space-y-8 pt-8 px-12">
      <div  *ngFor="let block of content.contentBlocks">
          <div *ngIf="block.name !== 'Skills'" class="hero ">
              <div class="hero-content flex-col lg:flex-row " *ngIf="block.image.path"><a href="{{block.image.href}}" target="_blank"> 
                  <img class="max-w-sm rounded-lg shadow-xl shadow-indigo-500/50" src="{{block.image.path}}" alt="{{block.subHeader}}"> </a>
                  <div>
                    <h2 *ngIf="block.subHeader" class="sub-header"> {{block.subHeader}} </h2>
                    <p *ngIf="block.text">{{block.text}} </p>
                  </div>
              </div>
          </div>
      </div>
    </div>
    </ng-container>
    <div *ngIf="!name" class="space-y-8 px-12">
        <ng-container *ngIf="(icons$ | async) as icons">
            <div class="flex flex-wrap justify-center" >
                <div  *ngFor="let icon of icons.icons" class="rounded-lg shadow-xl flex flex-col items-center p-5 lg:p-2">
                    <img height="70px" width="70px" src="{{icon.href}}" alt="{{icon.name}}">
                    <p> {{icon.name}} </p>
                </div>
            </div>
        </ng-container>
        <div class="divider"></div>
        <div  class="flex flex-col space-y-4 items-center">
            <div><p>Random playlist from My personal playlists. Provided using Spotify Web API.</p></div>
            <div *ngIf="randPlaylist" class="media shadow-lg shadow-cyan-500/50" style="min-height: 100px">
                <iframe style="border-radius:12px" [src]="randPlaylist | safe"  width="100%" height="410" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
            <div *ngIf="(dadJoke$ | async) as dadJoke">
                <p> {{dadJoke.joke}} <br> Joke provided by <a href="https://icanhazdadjoke.com/api" target="_blank">https://icanhazdadjoke.com/api</a></p>
                <button (click)="getRandDadJoke(); getRandPlaylist();" class="btn btn-outline btn-sm btn-info mt-2" >Refresh</button>
                <p>Will load new random joke and playlist</p>
            </div>
        </div>
    </div>
 `,
  styles: ``
})
export class MainComponent implements OnInit{
  name: string = "";
  content$: Observable<Content>;
  icons$: Observable<Icons>;
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
