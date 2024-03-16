import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../../shared/interfaces/user.interface';
import { UserService } from '../../../../shared/services/user.service';
import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.service';
import { CATEGORIESINTEREST } from '../../../../shared/configs/category-interest.consts';
import { BOOKSKELETONDATA } from '../../config/book.data';

@Component({
  templateUrl: './public-library.component.html',
  styleUrls: ['./public-library.component.scss']
})
export class PublicLibraryComponent implements OnInit {

  private bookService: BookService = inject(BookService)
  private userService: UserService = inject(UserService)

  user: User;
  books!: Book[];

  booksPublic!: Book[];
  booksSearch: Book[] = [];
  booksCheckBox: Book[] = [];
  booksShow!: Book[];

  categories = JSON.parse(JSON.stringify(CATEGORIESINTEREST))

  skeletonBooks: Book[] = BOOKSKELETONDATA;
  isLoadingMyBook: boolean = true;
  isLoadingPublicBook: boolean = true;

  constructor(private router: Router) {
    this.user = this.userService.getUserCurrent()
  }

  ngOnInit(): void {
    this.getBooks();
    this.getPublicBooks();
  }

  getBooks(): void {
    try {
      this.bookService.getBooks(this.user.user.userId, 4).subscribe({
        next: (response) => this.books = response,
        error: (err) => console.error(err),
        complete: () => { this.isLoadingMyBook = false }
      });
    } catch (error) { }
  }

  getPublicBooks(): void {
    try {
      this.bookService.getPublicBooks().subscribe({
        next: (response) => this.booksPublic = response,
        error: (err) => console.error(err),
        complete: () => { this.booksShow = [...this.booksPublic]; this.isLoadingPublicBook = false }
      });
    } catch (error) { }
  }

  viewBook(book: Book): void {
    this.router.navigate(["library/books/view/" + book.id]);
  }

  searchInput(event: any): void {
    this.booksSearch = event;
    this.search(this.booksSearch, this.booksCheckBox);

  }

  searchCheckBox(event: any): void {
    this.booksCheckBox = event;
    this.search(this.booksCheckBox, this.booksSearch);
  }

  search(current: any, other: any): void {
    // returns all books if there are no filters in place
    if (current.length === 0 && other.length === 0) {
      this.booksShow = [...this.booksPublic];
      return;
    }

    // filters only one filter and the other one is empty.
    if (current.length === 0) {
      console.log("cuando lo buscado no coinciden con nada")
      this.filter(other);
      return;
    }

    if (other.length === 0) {
      console.log("cuando el segundo lo buscado no coinciden con nada")
      this.filter(current);
      return;
    }

    this.booksShow = [...this.booksPublic.filter((element: any) => other.includes(element) && current.includes(element))];
  }

  filter(array: any): void {
    this.booksShow = [...this.booksPublic.filter((element: any) => array.includes(element))];
  }

  trackByFn(index: number, item: Book): string | undefined {
    return item.id;
  }
}

