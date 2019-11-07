import { CustomValidator, MustMatch } from './../../shared/custom.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { formErrors } from '../../data';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../user-profile/user-profile.component.css']
})
export class RegisterComponent implements OnInit {
  signUp: FormGroup;
  user: User;
  formErrors = formErrors;
  custom = CustomValidator;
  error;
  constructor(public auth: AuthService, private router: Router, private fb: FormBuilder ) { 
   
  }

  ngOnInit() {
    this.signUp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      Confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
    },
    {
      validator: MustMatch('password', 'Confirmpassword')
  });
  }
  mapFormValuesToUSer() {
    this.user.email = this.signUp.value.email;
    this.user.password = this.signUp.value.password;
    this.user.displayName = this.signUp.value.username;
  }
  ShowErrors() {
    this.custom.logValidationErrors(this.signUp);
  }
  signIn() {
    this.router.navigate(['/auth']);
  }
  onSubmit() {
    const errors =  this.auth.signUp(this.signUp.value.email, this.signUp.value.password);
    console.log( errors);
    this.error = errors;
    
   
    // result.catch((error) => {
    //   this.message = false;
    //   this.errors= error.message;
    //   console.log('the error is 1 : ', error.message);
    //   });
  }
}
