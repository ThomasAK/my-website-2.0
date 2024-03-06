import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from "./token";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    getToken(code: string): Observable<Token> {
        return this.httpClient.get<Token>(`/api/auth/${code}`);
    }

}