import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../interfaces/book.interface';
import { Category } from '../../interfaces/category.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { BOOKSKELETONDATA } from '../../config/book.data';

@Component({
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.scss']
})
export class BookShelfComponent implements OnInit {

  private bookService: BookService = inject(BookService)
  private categoryService: CategoryService = inject(CategoryService)
  private userService: UserService = inject(UserService)

  user: User;
  books!: Book[];
  booksSearch: Book[] = [];
  booksDropdown: Book[] = [];
  booksShow!: Book[];
  categories!: Category[];

  skeletonBooks: Book[] = BOOKSKELETONDATA;
  isLoading: boolean = true;

  constructor(private router: Router) {
    this.user = this.userService.getUserCurrent()
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

  getBooks(): void {
    try {
      this.bookService.getBooks(this.user.user.userId).subscribe({
        next: (response) => this.books = response,
        error: (err) => console.error(err),
        complete: () => { this.booksShow = [...this.books]; this.isLoading = false }
      });
    } catch (error) { }
  }

  getCategories(): void {
    try {
      this.categoryService.getCategories().subscribe({
        next: (response) => this.categories = response,
        error: (err) => console.error(err)
      });
    } catch (error) { }
  }

  viewBook(book: Book): void {
    this.router.navigate(["admin/books/view/" + book.id]);
  }

  searchInput(event: any): void {
    if (this.booksDropdown.length === 0 && event.length === this.books.length) {
      this.booksShow = [...this.books];
      return;
    }
    if (event.length === this.books.length) {
      this.booksSearch = [];
      this.filter(this.booksDropdown);
      return;
    }
    this.booksSearch = event;
    if (this.booksDropdown.length === 0) {
      this.filter(this.booksSearch);
      return;
    }
    this.booksShow = [...this.books.filter((element: any) => this.booksSearch.includes(element) && this.booksDropdown.includes(element))];
  }

  searchDropdown(event: any): void {
    if (event.length === this.books.length && this.booksSearch.length === 0) {
      this.booksShow = [...this.books];
      return;
    }

    if (event.length === this.books.length) {
      this.booksDropdown = [];
      this.filter(this.booksSearch);
      return;
    }
    this.booksDropdown = event;
    if (this.booksSearch.length === 0) {
      this.filter(this.booksDropdown);
      return;
    }
    this.booksShow = [...this.books.filter((element: any) => this.booksSearch.includes(element) && this.booksDropdown.includes(element))];
  }

  filter(array: any): void {
    this.booksShow = [...this.books.filter((element: any) => array.includes(element))];
  }

  trackByFn(index: number, item: Book): string | undefined {
    return item.id;
  }
}
