import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  private userService: UserService = inject(UserService);
  user: User;

  constructor() {
    this.user = this.userService.getUserCurrent();
  }

  ngOnInit(): void { }

}
