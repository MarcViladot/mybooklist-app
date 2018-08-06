import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {MatDialog, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  hide = true; // PASSWORD
  error = false;

  signinForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              public dialogRef: MatDialogRef<SigninComponent>) {
    this.signinForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}


  signIn(): void {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authService.signIn(email, password).subscribe(
      response => {
          localStorage.setItem('access_token', response.auth_token);
          this.postSignIn();
      },
      error => {
        this.error = true;
      }
    );
  }

  postSignIn(): void {
    this.dialogRef.close();
    this.authService.setCurrentUser();
    window.location.reload();
  }

}


