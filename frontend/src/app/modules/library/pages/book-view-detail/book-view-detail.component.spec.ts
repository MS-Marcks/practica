import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { Book } from '../../interfaces/book.interface';
import { BookViewDetailComponent } from './book-view-detail.component';
import { CoversComponent } from '../../components/covers/covers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from "rxjs";
import { DATA_BOOK_REGISTER } from '../../mocks/book.mock';

let DATA: Book = DATA_BOOK_REGISTER;

describe('BookViewDetailComponent', () => {
  let component: BookViewDetailComponent;
  let fixture: ComponentFixture<BookViewDetailComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookViewDetailComponent],
      imports: [
        CommonModule,
        CoversComponent,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        RouterTestingModule
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: { data: of({ book: DATA }) }
      }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookViewDetailComponent);
    component = fixture.componentInstance;
    component.user = { "user": { "userId": "w7qfsa5f21", "username": "ksuarez" }, "access_token": "", "tokenType": "" }
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  it('data is loaded correctly', () => {
    const title = compiled.querySelector('div[data-test="title"]')
    const author = compiled.querySelector('div[data-test="author"]')
    const url = compiled.querySelector('a[data-test="url"]')
    const summary = compiled.querySelector('div[data-test="summary"]')
    const category = compiled.querySelector('div[data-test="category"]')
    expect(title.textContent.trim()).toBe(DATA.title);
    expect(author.textContent.trim()).toBe(DATA.author);
    expect(url.textContent.trim()).toBe(DATA.url);
    expect(summary.textContent.trim()).toBe(DATA.summary);
    expect(category.textContent.trim()).toBe(DATA.idCategory?.join(","));
  });

});
