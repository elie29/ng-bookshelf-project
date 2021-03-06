import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import { tap } from 'rxjs/operators/tap';

import { Book } from './book';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class GoogleBooksService {
  public API_PATH = 'https://www.googleapis.com/books/v1/volumes';
  public loading = false;
  public initialised = false;
  public totalItems = 0;
  public _page = 1;
  public pageSize = 10;
  public query = '';
  public books: Book[] = [];

  constructor(private http: HttpClient) {}

  get startIndex() {
    return this.page * this.pageSize;
  }

  get totalPages() {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get page(): number {
    return this._page;
  }

  set page(val: number) {
    if (val !== this.page) {
      this._page = val;
      this.searchBooks(this.query);
    }
  }

  searchBooks(queryTitle: string) {
    this.query = queryTitle;
    this.books = [];
    if (this.query) {
      this.initialised = true;
      this.callApi();
    } else {
      this.initialised = false;
    }
  }

  retrieveBook(bookId: string) {
    return this.http.get(`${this.API_PATH}/${bookId}`);
  }

  bookFactory(item: any): Book {
    return new Book(
      item.id,
      item.volumeInfo.title,
      item.volumeInfo.subtitle,
      item.volumeInfo.authors,
      item.volumeInfo.publisher,
      item.volumeInfo.publishedDate,
      item.volumeInfo.description,
      item.volumeInfo.categories
        ? item.volumeInfo.categories.map(item =>
            item
              .split('/')
              .pop()
              .trim()
          )
        : ['N/A'],
      item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.thumbnail
        : 'http://lorempixel.com/g/200/300/',
      item.volumeInfo.imageLinks
        ? item.volumeInfo.imageLinks.smallThumbnail
        : 'http://lorempixel.com/g/200/300/'
    );
  }

  private callApi(): void {
    this.loading = true;
    this.http
      .get(this.API_PATH, this.getOptions())
      .pipe(
        tap((data: any) => (this.totalItems = data.totalItems)),
        map(data => (data.items ? data.items : [])),
        map(items => items.map(item => this.bookFactory(item))),
        tap(() => (this.loading = false))
      )
      .subscribe(books => (this.books = books));
  }

  private getOptions(): { params: HttpParams } {
    const params = new HttpParams()
      .set('q', this.query)
      .set('maxResults', `${this.pageSize}`)
      .set('startIndex', `${this.startIndex}`);
    return { params };
  }
}
