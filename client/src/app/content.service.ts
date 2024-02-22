import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Content } from './content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private content$: Subject<Content[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshContent() {
    this.httpClient.get<Content[]>(`/api/content`)
        .subscribe(content => {
          this.content$.next(content);
        });
  }

  getAllContent(): Subject<Content[]> {
    this.refreshContent();
    return this.content$;
  }

  getContent(name: string): Observable<Content> {
    return this.httpClient.get<Content>(`/api/content/${name}`);
  }
}