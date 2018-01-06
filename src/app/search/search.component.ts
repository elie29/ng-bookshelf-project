import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup;
  search: FormControl;

  constructor(
    public service: GoogleBooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.search = new FormControl('', Validators.required);
    this.form = new FormGroup({
      search: this.search
    });
    // When we refresh using the searched value
    this.route.params.subscribe(params => {
      if (params['term']) {
        this.doSearch(params['term']);
      }
    });
  }

  doSearch(term: string) {
    this.search.setValue(term);
    if (term) {
      this.service.searchBooks(term);
    }
  }

  onSearch() {
    const term = this.search.value;
    let opt = {};
    if (term) {
      opt = { term };
    }
    // Change the url with an optional term using Matrix URL notation
    this.router.navigate(['search', opt]);
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
}
