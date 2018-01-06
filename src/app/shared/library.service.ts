import { Injectable } from '@angular/core';

import { Book } from './book';

@Injectable()
export class LibraryService {
  books: Book[];

  constructor() {
    this.load();
  }

  addBook(book: Book) {
    if (!this.hasBook(book)) {
      this.books.push(book);
      this.save();
    }
  }

  removeBook(book: Book) {
    this.books = this.books.filter(item => item.id !== book.id);
    this.save();
  }

  hasBook(book: Book): boolean {
    return this.books.some(item => item.id === book.id);
  }

  findIndex(book: Book): number {
    return this.books.findIndex(item => item.id === book.id);
  }

  private save() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  private load() {
    this.books = [];
    let savedBooks = localStorage.getItem('books');
    if (!savedBooks) {
      return;
    }
    savedBooks = JSON.parse(savedBooks);
    for (const savedBook of savedBooks) {
      //noinspection TypeScriptValidateTypes,TypeScriptUnresolvedFunction
      this.books.push(
        Object.assign(
          new Book(null, null, null, null, null, null, null, null, null, null),
          savedBook
        )
      );
    }
  }
}
