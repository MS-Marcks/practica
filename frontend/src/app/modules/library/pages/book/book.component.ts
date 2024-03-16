import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../interfaces/book.interface';
import { UserService } from '../../../../shared/services/user.service';
import { User } from '../../../../shared/interfaces/user.interface';

@Component({
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  private userService: UserService = inject(UserService);

  user: User;
  book!: Book;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.user = this.userService.getUserCurrent();
  }

  ngOnInit(): void {
    this.route.data.subscribe(({ book }) => {
      this.book = book;
    });
  }

  isAuthor(): boolean {
    return this.book.userRegister === this.user.user.userId;
  }

  editBook(): void {
    this.router.navigate(["library/books/register/" + this.book.id]);
  }

  back(): void {
    window.history.back();
  }

}
