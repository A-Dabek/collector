import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideFirebaseApp} from "@angular/fire/app";
import {initializeApp} from "firebase/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyCWMEirzqk3V848iMTtGDUB2VwHq2YAHo8",
        authDomain: "collector-21cff.firebaseapp.com",
        projectId: "collector-21cff",
        storageBucket: "collector-21cff.appspot.com",
        messagingSenderId: "641294473346",
        appId: "1:641294473346:web:7a381920ea715df6d5bc9b"
      })
    ),
    provideFirestore(() => getFirestore()),]
};
