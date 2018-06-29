import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder) {
    this.regForm  = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Click submit for register.....');
    if (this.regForm.value.password === this.regForm.value.repassword) {
      this.afAuth.auth.createUserWithEmailAndPassword(
        this.regForm.value.email,
        this.regForm.value.password
      ).catch( (res) => {
        if (res.code === 'auth/email-already-in-use') {
          alert('Email already in use.');
        } else if (res.code === 'auth/invalid-email') {
          alert('Invalid email');
        } else if ( res.code === 'auth/operation-not-allowed') {
          alert('operation not allowed');
        } else if ( res.code === 'auth/weak-password') {
          alert('Password too weak');
        }
      }).then((au) => {
        this.router.navigate(['/login']);
      });
    } else {
      alert('password are different.');
    }
  }

}
