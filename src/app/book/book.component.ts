import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { switchMap } from 'rxjs/operators/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { Book } from '../shared/book';
import { GoogleBooksService } from '../shared/google-books.service';
import { LibraryService } from '../shared/library.service';

@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  public book: Book;

  private sub: Subscription;
  private term: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: GoogleBooksService,
    private lib: LibraryService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params
      .pipe(
        map(params => params['id']),
        switchMap(id => this.service.retrieveBook(id)),
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

  hasBook(): boolean {
    return this.lib.hasBook(this.book);
  }

  addBook(): void {
    this.lib.addBook(this.book);
  }

  removeBook(): void {
    this.lib.removeBook(this.book);
  }

  goBack(): void {
    this.location.back();
  }
}
