import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedMaterialModule } from './SharedModule';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LoginComponent } from './login/login.component';
import { WindowService } from './window.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ResetpasswordComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // import firebase/app needed for everything
    AngularFirestoreModule,   // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,    // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,  // imports firebase/storage only needed for storage features
  ],
  providers: [WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
