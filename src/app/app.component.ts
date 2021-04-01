import { Component } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import('firebase/database');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
     // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyBCc_ur-W2oZ89tjQymQg71jfxrIz9J29I',
    authDomain: 'booksmanager-e5d52.firebaseapp.com',
    databaseURL: 'https://booksmanager-e5d52-default-rtdb.firebaseio.com',
    projectId: 'booksmanager-e5d52',
    storageBucket: 'booksmanager-e5d52.appspot.com',
    messagingSenderId: '578446155663',
    appId: '1:578446155663:web:18a2c2fe57e72864f635fa'
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
