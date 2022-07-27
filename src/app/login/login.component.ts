import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'
import { LocalStorageRefService } from '../local-storage-ref.service';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';
import { ActiveUserService } from '../active-user.service';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LocalStorageService]
})


export class LoginComponent implements OnInit {

  
  public login = false;
  public createAcc = false;
  public orr = true;
  public loginBackground = "#489FB5";
  public accountBackground = "#489FB5";

  showLogin() {
    this.login = true;
    this.createAcc =false;
    this.orr = false;
    this.loginBackground = "#82C0CC";
  }

  showCreateAcc() {
    this.login = false;
    this.createAcc = true;
    this.orr = false;
    this.accountBackground = "#82C0CC";
  }


  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let repeatPass = group.get('repeatPass')?.value;
    return password === repeatPass ? null : { notSame: true }
  }

  currAccount = new FormGroup({
    userLogin: new FormControl('', [Validators.required]),
    passLogin: new FormControl('', [Validators.required])
  })

  newAccount = new FormGroup({
    username: new FormControl('', [Validators.required, accountExist()]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwords: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), containUppercase(), containNumber()]),
      repeatPass: new FormControl('', [Validators.required]),
    },  {validators: this.checkPasswords})
  })

  get password() {
    return this.newAccount.get('passwords.password');
  }

  get username() {
    return this.newAccount.get('username');
  }

  get email() {
    return this.newAccount.get('email');
  }

  public text = "";
  subLogin() {
    const name: string = this.currAccount.get('userLogin')?.value ?? '';
    const password: string = this.currAccount.get('passLogin')?.value ?? '';

    const success: string = "Login successful";
    const userNotFound: string = "This username is not found."
    const incorrectPass: string = "Incorrect Password."

    const output = this.user.login(name, password);



    if (output == "success") {
      //assigning the name reference to a cookie, then when loading taking the name to search local stoarge
      this.active.assignActive(name);

      this.currAccount.reset();
      this.router.navigate(['/home']);
    } else if (output == "userNotFound") {
      this.text = userNotFound;
    } else {
      this.text = incorrectPass;
    }

  }

  

  constructor(private users: LocalStorageService, private user: UserService, public router: Router, private active: ActiveUserService) { }
  
  subNewAcc() {
    const name: string = this.newAccount.get('username')?.value ?? '';
    const email: string = this.newAccount.get('email')?.value ?? '';
    const password: string = this.newAccount.get('passwords.password')?.value ?? '';
    
    this.user.newUser(name, email, password);
    this.active.assignActive(name);
    console.log("New Account Created");
    this.newAccount.reset();
    this.router.navigate(['/home']);

  }

  ngOnInit(): void {
  }

}

export function containUppercase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    return !hasUpperCase ? {hasUpperCase:true}: null;
  }
}

export function containNumber(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasNumber = /[0-9]+/.test(value);

    return !hasNumber ? {hasNumber:true}: null;
  }
}

export function accountExist(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const string = JSON.stringify(value);

    if (!value) {
      return null;
    }

    const accountExist = localStorage.getItem(string);

    return accountExist ? {accountExist:true}: null;
  }
}

