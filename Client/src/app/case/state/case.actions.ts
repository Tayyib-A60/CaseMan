import { Case } from '../case.model';

/* NgRx */
import { Action } from '@ngrx/store';

export enum CaseActionTypes {
  CreateCase = '[Case] Create Case',
  CreateCaseSuccess = '[Case] Create Case Success',
  CreateCaseFailure = '[Case] Create Case Failure',
  ReviewCase = '[Case] Review Case',
  ReviewCaseSuccess = '[Case] Review Case Success',
  ReviewCaseFailure = '[Case] Review Case Failure',
  GetCase = '[Case] Get Case',
  GetCaseSuccess = '[Case] Get Case Success',
  GetCaseFailure = '[Case] Get Case Failure',
  GetCases = '[Case] Get Cases',
  GetCasesSuccess = '[Case] Get Cases Success',
  GetCasesFailure = '[Case] Get Cases Failure',
  DeleteCase = '[Case] Delete Case',
  DeleteCaseSuccess = '[Case] Delete Case Success',
  DeleteCaseFailure = '[Case] Delete Case Failure',
}

// Action Creators

export class CreateCase implements Action {
  readonly type = CaseActionTypes.CreateCase;

  constructor(public payload: Case) {
      this.type = CaseActionTypes.CreateCase;
  }
}

export class CreateCaseSuccess implements Action {
  readonly type = CaseActionTypes.CreateCaseSuccess;

  constructor(public payload: any) {
      this.type = CaseActionTypes.CreateCaseSuccess
  }
}

export class CreateCaseFailure implements Action {
  readonly type = CaseActionTypes.CreateCaseFailure;

  constructor(public payload: string) {
      this.type = CaseActionTypes.CreateCaseFailure
  }
}

export class ReviewCase implements Action {
  readonly type = CaseActionTypes.ReviewCase;

  constructor(public payload: Case) {
      this.type = CaseActionTypes.ReviewCase
  }
}

export class ReviewCaseSuccess implements Action {
  readonly type = CaseActionTypes.ReviewCaseSuccess;

  constructor(public payload: Case) {
      this.type = CaseActionTypes.ReviewCaseSuccess
  }
}

export class ReviewCaseFailure implements Action {
  readonly type = CaseActionTypes.ReviewCaseFailure;

  constructor(public payload: any) {
      this.type = CaseActionTypes.ReviewCaseFailure
  }
}

export class GetCase implements Action {
  readonly type = CaseActionTypes.GetCase;

  constructor(public payload: any) {
      this.type = CaseActionTypes.GetCase
  }
}

export class GetCaseSuccess implements Action {
  readonly type = CaseActionTypes.GetCaseSuccess;

  constructor(public payload: any) {
      this.type = CaseActionTypes.GetCaseSuccess
  }
}

export class GetCaseFailure implements Action {
  readonly type = CaseActionTypes.GetCaseFailure;

  constructor(public payload: any) {
      this.type = CaseActionTypes.GetCaseFailure
  }
}

export class GetCases implements Action {
  readonly type = CaseActionTypes.GetCases;

  constructor(public payload: number) {
      this.type = CaseActionTypes.GetCases
  }
}

export class GetCasesSuccess implements Action {
  readonly type = CaseActionTypes.GetCasesSuccess;

  constructor(public payload: any) {
      this.type = CaseActionTypes.GetCasesSuccess
  }
}

export class GetCasesFailure implements Action {
  readonly type = CaseActionTypes.GetCasesFailure;

  constructor(public payload: any) {
      this.type = CaseActionTypes.GetCasesFailure
  }
}
export class DeleteCase implements Action {
  readonly type = CaseActionTypes.DeleteCase;

  constructor(public payload: number) {
      this.type = CaseActionTypes.DeleteCase
  }
}

export class DeleteCaseSuccess implements Action {
  readonly type = CaseActionTypes.DeleteCaseSuccess;

  constructor(public payload: number) {
      this.type = CaseActionTypes.DeleteCaseSuccess
  }
}

export class DeleteCaseFailure implements Action {
  readonly type = CaseActionTypes.DeleteCaseFailure;

  constructor(public payload: any) {
      this.type = CaseActionTypes.DeleteCaseFailure
  }
}

export type CaseActions = CreateCase
    | CreateCaseSuccess
    | CreateCaseFailure
    | ReviewCase
    | ReviewCaseSuccess
    | ReviewCaseFailure
    | GetCase
    | GetCaseSuccess
    | GetCaseFailure
    | GetCases
    | GetCasesSuccess
    | GetCasesFailure
    | DeleteCase
    | DeleteCaseSuccess
    | DeleteCaseFailure;