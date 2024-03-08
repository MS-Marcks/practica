import { Component, Input } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book.interface';

@Component({
  selector: 'library-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.scss'],
  standalone: true
})
export class CoversComponent {
  @Input("data") data!: Book;
}
