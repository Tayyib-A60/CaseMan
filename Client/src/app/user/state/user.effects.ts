import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { UserService } from '../user.service';
import { User, UserToLogin, Role } from '../user.model';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as userActions from './user.actions';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(private userService: UserService,
                private actions$: Actions,
                private notification: NotifierService,
                private router: Router) { }


    @Effect()
    createUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.CreateUser),
        map((action: userActions.CreateUser) => action.payload),
        mergeMap((user: User) =>
          this.userService.createUser(user).pipe(
            map(data => {
                this.notification.notify('success','User Created');
                this.router.navigate(['user/login']);
                return new userActions.CreateUserSuccess(data);
              }),
              catchError(err => {
                this.notification.notify('error',`err`);
                return of(new userActions.CreateUserFailure(err))
            })
          )
        )
      );    

    @Effect()
    loginUser$: Observable<Action> = this.actions$.pipe(
        ofType(userActions.UserActionTypes.LoginUser),
        map((action: userActions.LoginUser) => action.payload),
        mergeMap((user: UserToLogin) =>
          this.userService.loginUser(user).pipe(
            map(userCredentials => {
                this.notification.notify('success','Login Successful');
                if(userCredentials['role'] === Role.Customer) {
                  this.router.navigate(['/user/create-case']);
                } else {
                  this.router.navigate(['/user/cases']);
                }
                return new userActions.LoginUserSuccess(userCredentials);
              }),
              catchError(err => {
                this.notification.notify('error',`${err}`);
                return of(new userActions.LoginUserFailure(err))
            })
          )
        )
      );   
}