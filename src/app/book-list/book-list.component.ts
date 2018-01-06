import { Component, OnInit } from '@angular/core';
import { GoogleBooksService } from '../shared/google-books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  constructor(public service: GoogleBooksService) {}

  ngOnInit() {}
}
