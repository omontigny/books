import { Component } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
     // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBCc_ur-W2oZ89tjQymQg71jfxrIz9J29I",
    authDomain: "booksmanager-e5d52.firebaseapp.com",
    projectId: "booksmanager-e5d52",
    storageBucket: "booksmanager-e5d52.appspot.com",
    messagingSenderId: "578446155663",
    appId: "1:578446155663:web:7e1c00ece453bafaf635fa"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
