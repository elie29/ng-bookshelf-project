import { Component } from '@angular/core';

import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {
  constructor(public service: GoogleBooksService) {}

  next() {
    this.service.page++;
  }

  prev() {
    this.service.page--;
  }
}
