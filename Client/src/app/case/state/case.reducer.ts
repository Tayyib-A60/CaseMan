import { Case } from '../case.model';
import { CaseActionTypes, CaseActions, DeleteCaseSuccess, DeleteCaseFailure } from './case.actions';

export interface CaseState {
  cases: Case[];
  customerCase: Case;
  error: string;
  response: any;
}

const initialState: CaseState = {
  cases: [],
  customerCase: null,
  error: '',
  response: null
};

export function reducer(state = initialState, action: CaseActions): CaseState {

  switch (action.type) {
    case CaseActionTypes.CreateCaseSuccess:
      return {
        ...state,
        response: action.payload,
        error: ''
      };
    case CaseActionTypes.CreateCaseFailure:
      return {
        ...state,
        response: null,
        error: action.payload
      };
    case CaseActionTypes.ReviewCaseSuccess:
      const updatedCases = state.cases.map(
        customerCase => customerCase.caseId === action.payload.caseId ? action.payload : customerCase
      );
      return {
        ...state,
        cases: updatedCases,
        error: ''
      };
    case CaseActionTypes.ReviewCaseFailure:
      return {
        ...state,
        error: action.payload
      };
    case CaseActionTypes.GetCasesSuccess:
      return {
        ...state,
        cases: action.payload,
        error: ''
      };
    case CaseActionTypes.GetCasesFailure:
      return {
        ...state,
        cases: [],
        error: action.payload
      };
    case CaseActionTypes.GetCaseSuccess:
      return {
        ...state,
        customerCase: action.payload,
        error: ''
      };
    case CaseActionTypes.GetCasesFailure:
      return {
        ...state,
        customerCase: null,
        error: action.payload
      };
    case CaseActionTypes.DeleteCaseSuccess:
      return {
        ...state,
        cases: state.cases.filter(c => c.caseId !== action.payload),
        error: ''
      };
    case CaseActionTypes.DeleteCaseFailure:
      return {
        ...state,
        error: action.payload
      };
    
    default: 
      return { ...state }
  }
}    