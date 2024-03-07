import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/library/book.service';
import { Book } from 'src/app/shared/interfaces/book.interface';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'library-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss']
})
export class BookshelfComponent implements OnInit {

  user: User;
  books!: Book[];
  booksShow!: Book[];
  constructor(private bookService: BookService) {
    this.user = JSON.parse(localStorage.getItem("user") || "[]");
  }

  ngOnInit(): void {
    this.getBooks();
  }

  async getBooks(): Promise<void> {
    try {
      const response = await this.bookService.getBooks(this.user.user.userId);
      this.books = response;
      this.booksShow = [...this.books];
    } catch (error) {

    }
  }

  onSearchInput(event: any): void {
    this.booksShow = event;
  }

}
