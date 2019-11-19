import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';

import {AnyOpsOSAppCredentialsManagerService} from '../services/anyopsos-app-credentials-manager.service';
import {Credential} from '../types/credential';

@Component({
  selector: 'sacm-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @Input() application: Application;

  private destroySubject$: Subject<void> = new Subject();

  credentials: Credential[];
  activeCredential: string;
  viewSide: boolean = true;

  credentialForm: FormGroup;
  submitted: boolean = false;

  private MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  constructor(private CredentialsManager: AnyOpsOSAppCredentialsManagerService,
              private formBuilder: FormBuilder) {

    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe(credentials => this.credentials = credentials);
    this.CredentialsManager.activeCredential.pipe(takeUntil(this.destroySubject$)).subscribe(credential => {

      if (this.credentialForm) this.credentialForm.reset();
      this.activeCredential = credential;
    });
  }

  ngOnInit() {
    this.credentialForm = this.formBuilder.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      username: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });

    this.credentialForm.get('type').valueChanges
      .pipe(takeUntil(this.destroySubject$)).subscribe(type => {

      if (type === 'basic' || type === 'key') {
        this.credentialForm.controls.username.setValidators([Validators.required]);
        this.credentialForm.controls.username.updateValueAndValidity();
      } else {
        this.credentialForm.controls.username.setValidators([]);
        this.credentialForm.controls.username.updateValueAndValidity();
      }
    });
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  displayFn(type?: string): string | undefined {
    if (type === 'basic') return 'Username and Password';
    if (type === 'token') return 'Secret text';
    if (type === 'file') return 'Secret file';
    if (type === 'key') return 'Username with private keya';
    if (type === 'cert') return 'Certificate';
    return undefined;
  }

  get f() { return this.credentialForm.controls; }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  sendSave(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.credentialForm.invalid) {
      return;
    }

    if (this.activeCredential !== null) this.credentialForm.value.uuid = this.activeCredential;
    delete this.credentialForm.value.confirmPassword;

    this.CredentialsManager.saveCredential(this.credentialForm.value).then(() => {
      this.submitted = false;
      this.credentialForm.reset();
    });
  }

  setActiveCredential(credential: Credential): void {
    this.CredentialsManager.setActiveCredential(credential.uuid);

    this.credentialForm.controls.description.setValue(credential.description);
    this.credentialForm.controls.type.setValue(credential.type);
    this.credentialForm.controls.username.setValue(credential.username);
  }

}
