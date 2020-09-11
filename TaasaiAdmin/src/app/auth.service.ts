import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { UserResponse } from './_models/UserResponse';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

let baseURL = "http://35.197.237.60:4001/admin";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private currentUserSubject: BehaviorSubject<UserResponse>;
    public currentUser: Observable<UserResponse>;

    constructor(private http: HttpClient,private router:Router) {
        this.currentUserSubject = new BehaviorSubject<UserResponse>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserResponse {
        return this.currentUserSubject.value;
    }

    public login(email: string, password: string) {
        return this.http.post(baseURL+'/login', {"Email":email,"Password":password})
            .pipe(map((user:UserResponse) => {
                // login successful if there's a jwt token in the response
                if (user && user.Token!="") {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
            
                return user;
                
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        this.router.navigate(["login"])
    }
}
