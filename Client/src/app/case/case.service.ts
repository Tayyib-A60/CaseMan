import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Case } from './case.model'
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CaseManService {
    
url = environment.url;
token: string;

    constructor(private http: HttpClient) { }
    
    createCase(customerCase: Case) {
        this.token = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser')).token : null;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
        return this.http.post(`${this.url}caseman/createCase`, customerCase, { headers })
        .pipe(
            tap(data => data),
            catchError(this.handleError)
        );
    }

    getCase(userId: number, caseId: number) {
        this.token = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser')).token : null;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
        return this.http.get(`${this.url}caseman/getCase/${userId}/${caseId}`, { headers })
        .pipe(
            tap(data => data),
            catchError(this.handleError)
        );
    }

    getCases(userId: number) {
        this.token = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser')).token : null;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
        return this.http.get(`${this.url}caseman/getCases/${userId}`, { headers })
        .pipe(
            tap(data => data),
            catchError(this.handleError)
        );
    }
    
    reviewCase(customerCase: Case) {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));

        this.token = user? user['token'] : null;
        const userId =  user? user['id'] : null;

        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
        return this.http.post(`${this.url}caseman/reviewCase/${userId}`, customerCase, { headers })
        .pipe(
            tap(data => data),
            catchError(this.handleError)
        );
    }
    deleteCase(caseId: number) {
        const user = JSON.parse(sessionStorage.getItem('currentUser'));

        this.token = user? user['token'] : null;
        const userId =  user? user['id'] : null;
        
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` });
        return this.http.delete(`${this.url}caseman/removeCase/${userId}/${caseId}`, { headers })
        .pipe(
            tap(data => data),
            catchError(this.handleError)
        );
    }


    private handleError(err) {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          errorMessage = `${err.error}`;
        }
        return throwError(errorMessage);
      }
}