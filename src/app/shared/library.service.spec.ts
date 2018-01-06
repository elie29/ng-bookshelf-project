import { Book } from './book';
import { LibraryService } from './library.service';
import { basename } from 'path';

function createBookFixture() {
  return new Book(
    `${Math.random()}`,
    'title',
    'subTitle:',
    ['authors'],
    'publisher',
    'publishDate',
    'description',
    ['categories'],
    'thumbnail',
    'smallThumbnail'
  );
}

describe('LibraryService', () => {
  let service: LibraryService;

  beforeEach(() => {
    localStorage.removeItem('books');
    // Better than injection
    service = new LibraryService();
  });

  it('should has 0 book', () => {
    expect(service.books.length).toBe(0);
  });

  it('should add a book to the library', () => {
    const book = createBookFixture();
    service.addBook(book);
    expect(service.books.length).toBe(1);
    expect(service.books[0].id).toBe(book.id);
  });

  it('should remove a book from the library', () => {
    const book = createBookFixture();
    service.addBook(book);
    expect(service.books.length).toBe(1);
    service.removeBook(book);
    expect(service.books.length).toBe(0);
  });

  it('checks if a book is already in the library', () => {
    const book = createBookFixture();
    service.addBook(book);
    expect(service.hasBook).toBeTruthy();
  });

  it('should find the book index', () => {
    const book = createBookFixture();
    expect(service.findIndex(book)).toBe(-1);
    service.addBook(book);
    expect(service.findIndex(book)).toBe(0);
  });

  it('can save and load the books', () => {
    const book = createBookFixture();
    service.addBook(book);
    service.books = []; // Clean even the books to check that load is called
    service = new LibraryService(); // Create a new service, so load is called
    expect(service.books.length).toBe(1);
    expect(service.hasBook(book)).toBeTruthy();
    expect(service.books[0].id).toBe(book.id);
  });
});
