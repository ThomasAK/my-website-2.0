import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Content } from './content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private url = 'http://localhost:5200';
  private content$: Subject<Content[]> = new Subject();

  constructor(private httpClient: HttpClient) { }

  private refreshContent() {
    this.httpClient.get<Content[]>(`${this.url}/content`)
        .subscribe(content => {
          this.content$.next(content);
        });
  }

  getAllContent(): Subject<Content[]> {
    this.refreshContent();
    return this.content$;
  }

  getContent(id: string): Observable<Content> {
    return this.httpClient.get<Content>(`${this.url}/content/${id}`);
  }
}