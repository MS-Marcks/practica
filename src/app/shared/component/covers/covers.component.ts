import { Component, Input } from '@angular/core';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'shared-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.scss'],
  standalone: true
})
export class CoversComponent {
  @Input("data") data!: Book;
}
