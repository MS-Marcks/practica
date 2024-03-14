import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../interfaces/book.interface';

@Component({
  selector: 'library-covers',
  templateUrl: './covers.component.html',
  styleUrls: ['./covers.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CoversComponent {
  @Input("data") data!: Book;
  @Input("highlight") highlight: boolean = true;

  isLoading: boolean = true;
  error(event: any): void {
    this.isLoading = false;
    event.target.src = "assets/img/error.png";
  }

  load(): void {
    this.isLoading = false;
  }
}
