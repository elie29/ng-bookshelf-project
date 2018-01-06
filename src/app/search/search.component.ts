import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  search: FormControl;

  private sub: Subscription;

  constructor(
    public service: GoogleBooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.search = new FormControl('', Validators.required);
    // When we refresh using the searched value
    this.sub = this.route.params.subscribe(params => {
      this.onSearch(params['term']);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  doSearch() {
    const term = this.search.value;
    // Change the url with an optional term using Matrix URL notation
    this.router.navigate(['search', { term }]);
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

  private onSearch(term: string) {
    this.search.setValue(term);
    if (term) {
      this.service.searchBooks(term);
    }
  }
}
