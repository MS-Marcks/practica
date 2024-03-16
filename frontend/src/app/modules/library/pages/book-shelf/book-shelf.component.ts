import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { Book } from '../../interfaces/book.interface';
import { Category } from '../../interfaces/category.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { UserService } from '../../../../shared/services/user.service';
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
    this.router.navigate(["library/books/view/" + book.id]);
  }

  searchInput(event: any): void {
    this.booksSearch = event;
    this.search(this.booksSearch, this.booksDropdown);
  }

  searchDropdown(event: any): void {
    this.booksDropdown = event;
    this.search(this.booksDropdown, this.booksSearch);
  }

  search(current: any, other: any): void {
    // returns all books if there are no filters in place
    if (current.length === 0 && other.length === 0) {
      this.booksShow = [...this.books];
      return;
    }

    // filters only one filter and the other one is empty.
    if (current.length === 0) {
      current = [];
      this.filter(other);
      return;
    }

    if (other.length === 0) {
      this.filter(current);
      return;
    }

    this.booksShow = [...this.books.filter((element: any) => other.includes(element) && current.includes(element))];
  }

  filter(array: any): void {
    this.booksShow = [...this.books.filter((element: any) => array.includes(element))];
  }

  trackByFn(index: number, item: Book): string | undefined {
    return item.id;
  }
}
