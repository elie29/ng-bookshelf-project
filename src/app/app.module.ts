import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { HeaderComponent } from './header/header.component';
import { LibraryComponent } from './library/library.component';
import { PagerComponent } from './pager/pager.component';
import { SearchComponent } from './search/search.component';
import { GoogleBooksService } from './shared/google-books.service';
import { LibraryService } from './shared/library.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent,
    BookListComponent,
    SearchComponent,
    LibraryComponent,
    PagerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GoogleBooksService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
