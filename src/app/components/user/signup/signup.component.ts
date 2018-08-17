import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {MatDialogRef, MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  hide = true;
  errorShow = false;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              public dialogRef: MatDialogRef<SignupComponent>,
              public snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      // TODO VALIDATORS
    });
  }

  ngOnInit() {
  }

  postUser(): void {
    const data = {
      'email': this.signupForm.get('email').value,
      'username': this.signupForm.get('username').value,
      'password': this.signupForm.get('password').value,
      'password_confirmation': this.signupForm.get('passwordConfirmation').value
    };

    this.authService.signUp(data).subscribe(
      response => {
        this.dialogRef.close();
        this.snackBar.open('Please confirm your email', null, {
          duration: 5000,
        });
      },
      error => {
        this.errorShow = true;
      }
    );
  }

}
