import { Injectable } from '@angular/core';
import {Book} from '../models/book.model';
import {Subject} from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import('firebase/database');
import('firebase/storage');

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // @ts-ignore
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  // emit the content of Books Array
  emitBooks(): void {
    this.booksSubject.next(this.books);
  }

  // Insert book in the database . Set is like put and remplace already exists
  saveBooks(): void{
    firebase.database().ref('/books').set(this.books);
  }

  // get all books from database. on() Methode react to database event and each time a value change
  // the callback is executed . Permit de see updates in live if different persons update data
  getBooks(): void {
    firebase.database().ref('books').on('value', (data) => {
      this.books = data.val() ? data.val() : [];
      this.emitBooks();
    });
  }

  // asynchronous. No need to be in realtime. Just to be call once when we need it
  getSingleBook(id: number): any {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
        }
      );
      }
    );
  }

  createBook(newBook: Book): void {
    this.books.push(newBook);
    console.log('book', newBook);
    this.saveBooks();
    this.emitBooks();
  }

  //
  removeBook(book: Book): void {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo Supprimée!');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé:' + error);
        }
      );
    }
    // tslint:disable-next-line:one-variable-per-declaration
    const bookIndexToRemove: number = this.books.findIndex(
      (bookElement) => {
        if (bookElement === book ) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File): any {
    console.log('in upload file');
    return new Promise(
      (resolve, reject) => {
        const almostUniqFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement ....');
          },
          (error) => {
          console.log('Erreur Chargement: ' + error);
          reject();
          },
          () => {
              console.log('Chargement OK ');
              resolve(upload.snapshot.ref.getDownloadURL());
          }
          );
      }
    );
  }
}
