import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {lastValueFrom, Observable, of, switchMap} from 'rxjs';
import { Data as data } from '../../data';


@Injectable({
    providedIn: 'root'
})
export class SpotifyService {
    constructor(private httpClient: HttpClient) {}


    async getAccessToken(): Promise<string>{
        let result: any;
        const headers = new HttpHeaders()
            .set("Content-type", "application/x-www-form-urlencoded");
        result = await lastValueFrom( this.httpClient.post("https://accounts.spotify.com/api/token", `grant_type=client_credentials&client_id=${data.clientId}&client_secret=${data.clientSecret}`, {headers}))
        const token = result.access_token
        return token
    }


    async getMyPlaylists(): Promise<Observable<any>>{
        const token = await this.getAccessToken().then()
        console.log(token)
        const headers = new HttpHeaders()
            .set("Authorization", `Bearer ${token}`);
        return this.httpClient.get<any>(`https://api.spotify.com/v1/users/thomas.a.k.tk/playlists`, {headers});

    }

}