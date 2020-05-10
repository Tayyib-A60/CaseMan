import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as caseReducer from '../../state/case.reducer';
import * as caseActions from '../../state/case.actions';
import * as userActions from '../../../user/state/user.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromUser from '../../../user/state/index';
import { takeWhile } from 'rxjs/operators';
import { Case } from '../../case.model';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {
  caseForm: FormGroup;
  currentUser: any;
  currentUser$: Observable<any>;
  componentActive = true;
  adminUsers: any[];
  id: number;
  editMode: boolean;
  customerCase: Case;

  constructor(private store: Store<caseReducer.CaseState>) { }

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('currentUser') ? 
    JSON.parse(sessionStorage.getItem('currentUser')) : null;
    
    // this.store.pipe(select(fromUser.getAdminusers),
    // takeWhile(() => this.componentActive))
    // .subscribe(adminUsers => {
    //   this.adminUsers = adminUsers;
    // });
    this.initializeForm();
    
  }

  private initializeForm() {
    let description = '';
    let title = '';

    this.caseForm = new FormGroup({
      userId: new FormControl(this.currentUser.id, Validators.required),
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required)
    });
  }

  createCase() {
    console.log(this.caseForm.value);
    
      this.store.dispatch(new caseActions.CreateCase(this.caseForm.value));
      this.caseForm.reset();
  }

}
