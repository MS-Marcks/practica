import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.service';
import { CATEGORIESINTEREST } from 'src/app/shared/configs/category-interest.consts';

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
  booksDropdown: Book[] = [];
  booksShow!: Book[];

  categories = JSON.parse(JSON.stringify(CATEGORIESINTEREST))

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
        complete: () => {}
      });
    } catch (error) { }
  }

  getPublicBooks(): void {
    try {
      this.bookService.getPublicBooks().subscribe({
        next: (response) => this.booksPublic = response,
        error: (err) => console.error(err),
        complete: () =>  this.booksShow = [...this.booksPublic]
      });
    } catch (error) { }
  }

  viewBook(book: Book): void {
    this.router.navigate(["admin/books/view/" + book.id]);
  }

  searchInput(event: any): void {
    if (this.booksDropdown.length === 0 && event.length === this.booksPublic.length) {
      this.booksShow = [...this.booksPublic];
      return;
    }
    if (event.length === this.booksPublic.length) {
      this.booksSearch = [];
      this.filter(this.booksDropdown);
      return;
    }
    this.booksSearch = event;
    if (this.booksDropdown.length === 0) {
      this.filter(this.booksSearch);
      return;
    }

    this.booksShow = [...this.booksPublic.filter((element: any) => this.booksSearch.includes(element) && this.booksDropdown.includes(element))];
  }

  searchCheckBox(event: any): void {
    if (event.length === this.booksPublic.length && this.booksSearch.length === 0) {
      this.booksShow = [...this.booksPublic];
      return;
    }

    if (event.length === this.booksPublic.length) {
      this.booksDropdown = [];
      this.filter(this.booksSearch);
      return;
    }
    this.booksDropdown = event;
    if (this.booksSearch.length === 0) {
      this.filter(this.booksDropdown);
      return;
    }
    this.booksShow = [...this.booksPublic.filter((element: any) => this.booksSearch.includes(element) && this.booksDropdown.includes(element))];
  }

  filter(array: any): void {
    this.booksShow = [...this.booksPublic.filter((element: any) => array.includes(element))];
  }

  trackByFn(index: number, item: Book): string | undefined {
    return item.id;
  }
}

