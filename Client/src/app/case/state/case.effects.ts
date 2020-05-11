import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { CaseManService } from '../case.service';
import { Case } from '../case.model';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as caseActions from './case.actions';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable({
    providedIn: 'root'
})
export class CaseEffects {
  adminId: number;
    constructor(private caseService: CaseManService,
                private actions$: Actions,
                private notifier: NotifierService,
                private router: Router) {
                  this.adminId = sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser'))['id'] : 0;
                }


    @Effect()
    createCase$: Observable<Action> = this.actions$.pipe(
        ofType(caseActions.CaseActionTypes.CreateCase),
        map((action: caseActions.CreateCase) => action.payload),
        mergeMap((customerCase: Case) =>
          this.caseService.createCase(customerCase).pipe(
            map(res=> {
                this.notifier.notify('success','Case Created');
                this.router.navigate(['user/cases']);
                return new caseActions.CreateCaseSuccess(res);
            }),
            catchError(err => {
              this.notifier.notify('error',`${err}`);
                return of(new caseActions.CreateCaseFailure(err))
            })
          )
        )
      );

    @Effect()
    reviewCase$: Observable<Action> = this.actions$.pipe(
        ofType(caseActions.CaseActionTypes.ReviewCase),
        map((action: caseActions.ReviewCase) => (action.payload)),
        mergeMap((customerCase: Case) =>
          this.caseService.reviewCase(customerCase).pipe(
            map((customerCase: Case) => {
              this.notifier.notify('success','Case Review successful');
              this.router.navigate(['user/cases']);
              return new caseActions.ReviewCaseSuccess(customerCase);
            }),
            catchError(err => {
              this.notifier.notify('error',`${err}`);
                return of(new caseActions.ReviewCaseFailure(err))
            })
          )
        )
      );


      @Effect()
      getCase$: Observable<Action> = this.actions$.pipe(
          ofType(caseActions.CaseActionTypes.GetCase),
          mergeMap((action: caseActions.GetCase) => this.caseService.getCase(action.payload['userId'], action.payload['customerCaseId'])
          .pipe(
              map(customerCase => new caseActions.GetCaseSuccess(customerCase)),
                catchError(err => {
                  this.notifier.notify('error',`${err}`);
                  return of(new caseActions.GetCaseFailure(err))
              })
          )
        )
      );

      @Effect()
      getCases$: Observable<Action> = this.actions$.pipe(
          ofType(caseActions.CaseActionTypes.GetCases),
          mergeMap((action: caseActions.GetCases) => this.caseService.getCases(action.payload)
          .pipe(
              map(cases => new caseActions.GetCasesSuccess(cases)),
                catchError(err => {
                  this.notifier.notify('error',`${err}`);
                  return of(new caseActions.GetCasesFailure(err))
              })
          )
        )
      );

      @Effect()
      deleteCase$: Observable<Action> = this.actions$.pipe(
          ofType(caseActions.CaseActionTypes.DeleteCase),
          map((action: caseActions.DeleteCase) => action.payload),
          mergeMap((caseId: number) => 
              this.caseService.deleteCase(caseId).pipe(
                  map((caseId: number) => {
                      this.notifier.notify('success', 'Case deleted');
                      return new caseActions.DeleteCaseSuccess(caseId);
                  }),
                  catchError(err => {
                      this.notifier.notify('error', `${err.message}`);
                      return of(new caseActions.DeleteCaseFailure(err));
                  })
              )
          )
      );

    
}