import { Routes } from '@angular/router';

import { BookComponent } from './book/book.component';
import { LibraryComponent } from './library/library.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'book/:id', component: BookComponent },
  { path: '**', redirectTo: 'search' }
];
