import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DadJokeService {
    constructor(private httpClient: HttpClient) {}

    getRandom(): Observable<any> {
        const headers = new HttpHeaders()
            .set("Accept", "application/json")
        return  this.httpClient.get("https://icanhazdadjoke.com/", {headers})
    }

}