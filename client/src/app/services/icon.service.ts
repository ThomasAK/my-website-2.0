import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Icons } from './icons';

@Injectable({
    providedIn: 'root'
})
export class IconsService {
    private Icons$: Subject<Icons[]> = new Subject();

    constructor(private httpClient: HttpClient) { }

    private refreshIcons() {
        this.httpClient.get<Icons[]>(`/api/icons`)
            .subscribe(Icons => {
                this.Icons$.next(Icons);
            });
    }

    getAllIcons(): Subject<Icons[]> {
        this.refreshIcons();
        return this.Icons$;
    }

    getIcons(name: string): Observable<Icons> {
        return this.httpClient.get<Icons>(`/api/icons/${name}`);
    }
}