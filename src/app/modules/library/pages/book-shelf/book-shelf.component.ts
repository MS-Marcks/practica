import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../interfaces/book.interface';
import { Category } from '../../interfaces/category.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

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

  constructor(private router: Router) {
    this.user = this.userService.getUserCurrent()
  }

  ngOnInit(): void {
    this.getBooks();
    this.getCategories();
  }

  async getBooks(): Promise<void> {
    try {
      const response = await this.bookService.getBooks(this.user.user.userId);
      this.books = response;
      this.booksShow = [...this.books];
    } catch (error) { }
  }

  async getCategories(): Promise<void> {
    try {
      const response = await this.categoryService.getCategories();
      this.categories = response;
    } catch (error) { }
  }

  onViewBook(book: Book): void {
    this.router.navigate(["admin/books/view/" + book.id]);
  }

  onSearchInput(event: any): void {
    if (this.booksDropdown.length === 0 && event.length === this.books.length) {
      this.booksShow = [...this.books];
      return;
    }
    if (event.length === this.books.length) {
      this.booksSearch = [];
      this.onFilter(this.booksDropdown);
      return;
    }
    this.booksSearch = event;
    if (this.booksDropdown.length === 0) {
      this.onFilter(this.booksSearch);

      return;
    }
    this.booksShow = [...this.books.filter((element: any) => this.booksSearch.includes(element) && this.booksDropdown.includes(element))];
  }

  onSearchDropdown(event: any): void {
    if (event.length === this.books.length && this.booksSearch.length === 0) {
      this.booksShow = [...this.books];
      return;
    }

    if (event.length === this.books.length) {
      this.booksDropdown = [];
      this.onFilter(this.booksSearch);
      return;
    }
    this.booksDropdown = event;
    if (this.booksSearch.length === 0) {
      this.onFilter(this.booksDropdown);
      return;
    }
    this.booksShow = [...this.books.filter((element: any) => this.booksSearch.includes(element) && this.booksDropdown.includes(element))];
  }

  onFilter(array: any): void {
    this.booksShow = [...this.books.filter((element: any) => array.includes(element))];
  }

  trackByFn(index: number, item: Book) {
    return item.id;
  }
}
