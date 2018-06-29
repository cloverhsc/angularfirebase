import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  resetForm: FormGroup;
  errorCode: number;
  errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth
  ) {
    this.resetForm = this.fb.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit() { }

  onSubmit() {
    console.log('Click submit to send reset password.....');
    this.afAuth.auth.sendPasswordResetEmail(this.resetForm.value.email)
    .catch((error) => {
      this.errorCode = error.code;
      this.errorMsg = error.message;
    });
    // console.log(this.resetForm.value.email);
  }
}
