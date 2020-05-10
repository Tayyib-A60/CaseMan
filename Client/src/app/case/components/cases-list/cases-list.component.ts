import { Component, OnInit } from '@angular/core';
import { Case } from '../../case.model';

import * as fromStory from '../../state/index';
import * as caseActions from '../../state/case.actions';
import * as caseReducer from '../../state/case.reducer';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { AdminGuardService } from '../../../services/admin-guard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cases-list',
  templateUrl: './cases-list.component.html',
  styleUrls: ['./cases-list.component.scss']
})
export class CasesListComponent implements OnInit {
  cases: Case[] = [];
  currentUser: any;
  componentActive = true;
  caseForm: FormGroup;
  adminComment: string = '';
  
  constructor(private store: Store<caseReducer.CaseState>,
              private adminAuthGuard: AdminGuardService) { }

  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.initializeForm();
    this.store.dispatch(new caseActions.GetCases(this.currentUser.id));

    this.store.pipe(select(fromStory.getCases),
    takeWhile(() => this.componentActive))
    .subscribe(cases => {
      this.cases = cases;
    });
  }

  private initializeForm() {
    const title = '';
    const description = '';

    this.caseForm = new FormGroup({
      userId: new FormControl(this.currentUser? this.currentUser.id : null),
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required)
    });
  }
  
  isAdmin() {
    return this.adminAuthGuard.isAdmin();
  }

  review(customerCase: Case) {
    const customerCaseToReview = {
      ...customerCase,
      reviewedByAdmin: true,
      adminComment: this.adminComment
    };
    this.store.dispatch(new caseActions.ReviewCase(customerCaseToReview));
    this.adminComment = '';
  }

  deleteCase(caseId: number) {
      if(confirm('Confirm delete of case')) {
        this.store.dispatch(new caseActions.DeleteCase(caseId));
      }
  }
}
