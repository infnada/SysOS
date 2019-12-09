import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

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

    this.CredentialsManager.credentials.pipe(takeUntil(this.destroySubject$)).subscribe((credentials: Credential[]) => this.credentials = credentials);
  }

  ngOnInit(): void {
    this.credentialForm = this.formBuilder.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      username: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      uuid: [null]
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

    this.CredentialsManager.activeCredential.pipe(takeUntil(this.destroySubject$)).subscribe((activeCredentialUuid: string) => {

      this.activeCredential = activeCredentialUuid;
      if (!activeCredentialUuid) return this.credentialForm.reset();

      // Set Form controls with currentCredential data
      const currentCredential = this.CredentialsManager.getCredentialByUuid(activeCredentialUuid);
      Object.keys(currentCredential).forEach((item) => {
        if (this.credentialForm.controls[item]) this.credentialForm.controls[item].setValue(currentCredential[item]);
      });
    });
  }

  ngOnDestroy(): void {
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

  get f(): { [key: string]: AbstractControl } { return this.credentialForm.controls; }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  sendSave(): void {

    // stop here if form is invalid
    if (this.credentialForm.invalid) return;

    const formCredential = Object.assign({}, this.credentialForm.value);
    delete formCredential.confirmPassword;
    if (formCredential.uuid === null) delete formCredential.uuid;

    this.CredentialsManager.saveCredential(formCredential).then(() => {
      this.credentialForm.reset();
    });
  }

  setActiveCredential(credential: Credential): void {
    this.CredentialsManager.setActiveCredential(credential.uuid);
  }

}
