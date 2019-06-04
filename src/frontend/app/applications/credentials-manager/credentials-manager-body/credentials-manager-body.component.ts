import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {CredentialsManagerService} from '../credentials-manager.service';

import {Credential} from '../credential';
import {Application} from '../../../interfaces/application';

@Component({
  selector: 'app-credentials-manager-body',
  templateUrl: './credentials-manager-body.component.html',
  styleUrls: ['./credentials-manager-body.component.scss']
})
export class CredentialsManagerBodyComponent implements OnInit {
  @Input() application: Application;

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

  constructor(private CredentialsManager: CredentialsManagerService,
              private formBuilder: FormBuilder) {

    this.CredentialsManager.credentials.subscribe(credentials => this.credentials = credentials);
    this.CredentialsManager.activeCredential.subscribe(credential => {

      if (this.credentialForm) this.credentialForm.reset();
      this.activeCredential = credential;
    });
  }

  ngOnInit() {
    this.credentialForm = this.formBuilder.group({
      description: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
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

    (this.credentialForm.controls.description as FormControl).setValue(credential.description);
    (this.credentialForm.controls.username as FormControl).setValue(credential.username);
  }

}
