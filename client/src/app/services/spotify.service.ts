import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class spotifyService {
    tokenTime: Date;
    private token: string;
    oneHour: number;
    constructor(private httpClient: HttpClient) { this.oneHour = 60 * 60 * 1000; }

    getAccessToken(): Observable<{token_type: string, access_token: string, expires_in: string}> {
        const headers = new HttpHeaders()
            .set("Content-type", "application/x-www-form-urlencoded")
        return this.httpClient.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret", {headers})
    }

    getCurrentlyPlaying(): Observable<{}> {
        if ((new Date()) - this.tokenTime > this.oneHour) {
            this.getAccessToken().subscribe(res => {
                this.token = `${res.token_type} ${res.access_token}`
                this.tokenTime = new Date()
            })
        }


        const headers = new HttpHeaders()
            .set("Authorization", this.token);
        return this.httpClient.get(`https://api.spotify.com/v1/me/player/currently-playing`, {headers});
    }
}