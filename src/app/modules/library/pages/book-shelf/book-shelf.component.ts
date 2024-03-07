import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/library/book.service';
import { CategoryService } from 'src/app/core/services/library/category.service';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'library-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.scss']
})
export class BookShelfComponent implements OnInit {

  user: User;
  books!: Book[];
  booksSearch: Book[] = [];
  booksDropdown: Book[] = [];
  booksShow!: Book[];

  categories!: Category[];

  constructor(private bookService: BookService, private categoryService: CategoryService) {
    this.user = JSON.parse(localStorage.getItem("user") || "[]");
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
