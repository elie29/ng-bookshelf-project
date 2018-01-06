import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { Book } from '../shared/book';
import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  public book: Book;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private service: GoogleBooksService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        map(params => params['id']),
        switchMap(id => this.getBook(id)),
        map((item: any) => {
          const book = this.service.bookFactory(item);
          if (
            item.volumeInfo &&
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.small
          ) {
            book.thumbnail = item.volumeInfo.imageLinks.small;
          }
          return book;
        })
      )
      .subscribe(book => (this.book = book));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getBook(bookId: string) {
    return this.service.retrieveBook(bookId);
  }

  hasBook(book: Book): boolean {
    //TODO
    return false;
  }

  addBook(book: Book) {
    //TODO
  }

  removeBook(book: Book) {
    //TODO
  }
}
