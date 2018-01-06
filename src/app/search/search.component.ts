import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../shared/google-books.service';
import { Book } from '../shared/book';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  search: FormControl;

  constructor(public service: GoogleBooksService) {}

  doSearch() {
    const value = this.search.value;
    console.log('doSearch:: ', value);
    if (value) {
      this.service.searchBooks(value);
    }
  }

  foundNoResult(): boolean {
    return (
      !this.service.loading &&
      this.service.initialised &&
      this.service.books.length == 0
    );
  }

  foundResults(): boolean {
    return !this.service.loading && this.service.books.length > 0;
  }

  onSearch(term: string) {
    //TODO
  }

  ngOnInit() {
    this.search = new FormControl('', Validators.required);
    this.form = new FormGroup({
      search: this.search
    });
  }
}
