import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseEffects } from './state/case.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/case.reducer';
import { CreateCaseComponent } from './components/create-case/create-case.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CasesListComponent } from './components/cases-list/cases-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuardService } from '../services/authGuard.service';
import { UserGuardService } from '../services/user-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
    return sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser')).token: null;
}

const caseManRoutes: Routes = [
    { path: 'user/create-case', component: CreateCaseComponent , canActivate: [ UserGuardService ] },
    { path: 'user/cases', component: CasesListComponent, canActivate: [ AuthGuardService ] }
  ];
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild(caseManRoutes),
        StoreModule.forFeature('caseMan', reducer),
        EffectsModule.forFeature([ CaseEffects ]),
        MDBBootstrapModule.forRoot(),
        JwtModule.forRoot({
            config: {
              tokenGetter: tokenGetter
            }
        }),
    ],
    declarations: [CreateCaseComponent, CasesListComponent]
})
export class CaseManModule { }
