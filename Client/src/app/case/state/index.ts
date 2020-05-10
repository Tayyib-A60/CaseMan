import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromCase from './case.reducer';


// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends fromRoot.AppState {
    caseMan: fromCase.CaseState;
}

// Selector functions
const getCaseFeatureState = createFeatureSelector<fromCase.CaseState>('caseMan');

export const getCases = createSelector(
    getCaseFeatureState,
    state => state.cases
);

export const getCase = createSelector(
    getCaseFeatureState,
    state => state.customerCase
);
