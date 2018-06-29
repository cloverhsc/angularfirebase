import { WindowService } from './../window.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ WindowService, AngularFireDatabase]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  phoneForm: FormGroup;

  windowRef: any;
  verificationCode: string;
  user: any;

  items$: Observable<any[]>;
  item$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    private fb: FormBuilder,
    private _db: AngularFireDatabase
  ) {
    this.createForm();
    this.afAuth.authState.subscribe(
      (data) => {
        if (data) {
          console.log(data);
          console.log(data.displayName);
        }
      }
    );
  }

  ngOnInit(): void {
    this.items$ = this._db.list('items').valueChanges();
    this.item$ = this._db.object('items/1').valueChanges();

    this.afAuth.auth.useDeviceLanguage();
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    //   'sign-in-button', {
    //     'size': 'invisible',
    //     'callback': (response) => {
    //       this.PhoneLogin();
    //     }});
    // this.windowRef.recaptchaVerifier.render();

    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    // this.windowRef.recaptchaVerifier.render().then(
    //   (widgetId) => { this.windowRef.recaptchaWidgetId = widgetId;
    // });
  }

  Glogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  Flogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  Tlogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }

  PhoneLogin() {
    const applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(
      this.phoneForm.value.number, applicationVerifier
    ).then((confirmationResult) => {
      const verificationCode = window.prompt(
        'Please enter the verifcation code' +
        ' that was sent to your mobile device');
        return confirmationResult.confirm(verificationCode);
    }).catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
    // const phoneNumber = this.phoneForm.value.number;
    // const appVerifier = this.windowRef.recaptchaVerifier;
    // firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    // .then((confirmationResult) => {
    //   this.windowRef.confirmationResult = confirmationResult;
    // })
    // .catch();

    // const appVerifier = this.windowRef.recaptchaVerifier;
    // this.afAuth.auth.signInWithPhoneNumber(
    //   this.phoneForm.value.number,
    //   appVerifier
    // )
    // .then(
    //   result => {
    //     this.windowRef.confirmationResult = result;
    // })
    // .catch(
    //   (error) => {
    //     console.log(error.code);
    //     console.log(error.message);
    // });
    // console.log(this.phoneForm.value.number);
  }

  verifyLoginCode() {
    // this.windowRef.confirmationResult
    // .confirm(this.phoneForm.value.verificode)
    // .then( result => {
    //   this.user = result.user;
    // })
    // .catch( error => console.log( error, 'Incorrect code entered?'));
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.phoneForm = this.fb.group({
      number: ['', Validators.required],
      verificode: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Click submit......');

    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.value.email,
      this.loginForm.value.password
    ).catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
  }

}


export class PhoneNumber {
  country: string;
  area: string;
  prefix: string;
  line: string;

  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}
