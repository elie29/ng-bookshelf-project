import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { GoogleBooksService } from './google-books.service';
import {
  fakeRetrieveBookResponse,
  fakeSearchBooksResponse
} from './test/fakeResponse';

describe('GoogleBooksService', () => {
  let service: GoogleBooksService;
  let http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // This service is shared among all test
      providers: [GoogleBooksService] // we can use new instead of using providers
    });
    service = TestBed.get(GoogleBooksService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should return books when searched', () => {
    // Call the service
    service.searchBooks('Angular');

    // Inject fakeResponse
    const url = `${service.API_PATH}?q=Angular&maxResults=10&startIndex=10`;
    http.expectOne(url).flush(fakeSearchBooksResponse);

    // Test results
    expect(service.books.length).toBe(2);
    const b = service.books[0];
    expect(b.id).toBe('js2P_8lbR2wC');
    expect(b.title).toBe('Fundamentals of Biomechanics');
    expect(b.subTitle).toBeUndefined();
    expect(b.authors.length).toBe(1);
    expect(b.authors[0]).toBe('Duane V. Knudson');
    expect(b.publisher).toBe('Springer Science & Business Media');
    expect(b.publishDate).toBe('2003-01-01');
    expect(b.description).toContain('Biomechanics');
    expect(b.categories.length).toBe(1);
    expect(b.categories[0]).toBe('Science');
    expect(b.thumbnail).toContain('printsec=frontcover');
    expect(b.smallThumbnail).toContain('js2P_8lbR2wC&printsec');
  });

  it(
    'should return a single book when requested with fakeAsync',
    fakeAsync(() => {
      // Call the service
      let book;
      service.retrieveBook('js2P_8lbR2wC').subscribe(item => (book = item));

      // Inject fakeResponse
      const url = `${service.API_PATH}/js2P_8lbR2wC`;
      http.expectOne(url).flush(fakeRetrieveBookResponse);

      tick(); // Wait until all promised are resolved: but not necessary here

      // Test results
      expect(book.id).toBe('js2P_8lbR2wC');
      expect(book.subTitle).toBeUndefined();
      const b = book.volumeInfo;
      expect(b.title).toBe('Fundamentals of Biomechanics');
      expect(b.authors.length).toBe(1);
      expect(b.authors[0]).toBe('Duane V. Knudson');
      expect(b.publisher).toBe('Springer Science & Business Media');
      expect(b.publishedDate).toBe('2003');
      expect(b.description).toContain('Biomechanics introduces');
      expect(b.categories.length).toBe(1);
      expect(b.categories[0]).toContain('Anatomy & Physiology');
      expect(b.imageLinks.thumbnail).toContain('books.google.com/books');
      expect(b.imageLinks.smallThumbnail).toContain('frontcover&img=1');
    })
  );

  it('should perform a search when the page is changed', () => {
    spyOn(service, 'searchBooks').and.returnValue(undefined);
    expect(service.page).toBe(1);
    service.page = 4;
    expect(service.searchBooks).toHaveBeenCalled();
  });

  it(
    'should perform a search when the page is changed with injected service',
    inject([GoogleBooksService], (injectService: GoogleBooksService) => {
      spyOn(injectService, 'searchBooks').and.returnValue(undefined);
      expect(injectService.page).toBe(1);
      injectService.page = 2;
      expect(injectService.searchBooks).toHaveBeenCalled();
    })
  );
});
