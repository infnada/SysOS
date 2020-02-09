import {Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {Application} from '@anyopsos/lib-application';
import {AnyOpsOSLibCredentialHelpersService} from '@anyopsos/lib-credential';
import {Credential} from '@anyopsos/module-credential';

import {AnyOpsOSAppCredentialsManagerService} from '../../services/anyopsos-app-credentials-manager.service';

@Component({
  selector: 'aacm-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnDestroy, OnInit {
  @ViewChild('bodyContainer', {static: true, read: ViewContainerRef}) private readonly bodyContainer: ViewContainerRef;
  @Input() readonly application: Application;

  private readonly destroySubject$: Subject<void> = new Subject();

  viewSide: boolean = true;

  credentials: Credential[];
  activeCredentialUuid: string;

  credentialForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly LibCredentialHelpers: AnyOpsOSLibCredentialHelpersService,
              private readonly CredentialsManager: AnyOpsOSAppCredentialsManagerService) {
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
      validator: this.mustMatch('password', 'confirmPassword')
    });

    // Listen form credentialForm changes
    this.credentialForm.get('type').valueChanges
      .pipe(takeUntil(this.destroySubject$)).subscribe((type: string) => this.onCredentialTypeChange(type));

    // Listen for credentials changes
    this.LibCredentialHelpers.getAllCredentialsObserver()
      .pipe(takeUntil(this.destroySubject$)).subscribe((credentials: Credential[]) => {
      this.onCredentialsChange(credentials);
    });

    // Set bodyContainerRef, this is used by Modals
    this.CredentialsManager.setBodyContainerRef(this.bodyContainer);

    // Listen for activeCredentialUuid change
    this.CredentialsManager.activeCredentialUuid
      .pipe(takeUntil(this.destroySubject$)).subscribe((activeCredentialUuid: string | null) => this.onActiveCredentialChange(activeCredentialUuid));
  }

  ngOnDestroy(): void {

    // Remove all listeners
    this.destroySubject$.next();
  }

  toggleSide(): void {
    this.viewSide = !this.viewSide;
  }

  /**
   * Form password validator
   */
  private mustMatch(controlName: string, matchingControlName: string) {
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

  /**
   * Set Form validators conditional on credential type
   */
  private onCredentialTypeChange(type: string) {
    if (type === 'basic' || type === 'key') {
      this.credentialForm.controls.username.setValidators([Validators.required]);
      this.credentialForm.controls.username.updateValueAndValidity();
    } else {
      this.credentialForm.controls.username.setValidators([]);
      this.credentialForm.controls.username.updateValueAndValidity();
    }
  }

  private onCredentialsChange(credentials: Credential[]): void {
    this.credentials = credentials;
    this.CredentialsManager.credentialsUpdated();
  }

  /**
   * Show credential data at DOM Form based on activeCredentialUuid
   */
  private async onActiveCredentialChange(activeCredentialUuid: string | null) {
    this.activeCredentialUuid = activeCredentialUuid;
    if (!activeCredentialUuid) return this.credentialForm.reset();

    // Set Form controls with currentCredential data
    const currentCredential = await this.CredentialsManager.getActiveCredential();
    Object.keys(currentCredential).forEach((item) => {
      if (this.credentialForm.controls[item]) this.credentialForm.controls[item].setValue(currentCredential[item]);
    });
  }

  /**
   * Form getter
   */
  get f(): { [key: string]: AbstractControl } { return this.credentialForm.controls; }

  /**
   * mat-autocomplete displayWith
   */
  displayFn(type?: string): string | undefined {
    if (type === 'basic') return 'Username and Password';
    if (type === 'token') return 'Secret text';
    if (type === 'file') return 'Secret file';
    if (type === 'key') return 'Username with private keya';
    if (type === 'cert') return 'Certificate';
    return undefined;
  }

  /**
   * Save credential form to backend
   */
  sendSave(): void {

    // stop here if form is invalid
    if (this.credentialForm.invalid) return;

    const formCredential = Object.assign({}, this.credentialForm.value);
    delete formCredential.confirmPassword;
    if (formCredential.uuid === null) delete formCredential.uuid;

    this.CredentialsManager.saveCredential(formCredential).then(() => {
      this.CredentialsManager.setActiveCredentialUuid(null);
    });
  }

  /**
   * Set active credential, it will always show the active credential data on DOM Form
   */
  setActiveCredentialUuid(credential: Credential): void {
    this.CredentialsManager.setActiveCredentialUuid(credential.uuid);
  }

}
