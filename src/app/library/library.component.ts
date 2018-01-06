import { Component } from '@angular/core';

import { LibraryService } from '../shared/library.service';

@Component({
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent {
  constructor(public service: LibraryService) {}
}
