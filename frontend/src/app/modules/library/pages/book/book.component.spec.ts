import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { Book } from '../../interfaces/book.interface';
import { BookComponent } from './book.component';
import { CoversComponent } from '../../components/covers/covers.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { ActivatedRoute } from '@angular/router';
import { of } from "rxjs";
import { UserService } from '../../../../shared/services/user.service';


let DATA: Book = {
  title: "React",
  author: "example",
  url: "https://itbook.store/books/9781617291609",
  image: "https://itbook.store/img/books/9781617291609.png",
  summary: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  idCategory: [
    "Ciencia Ficción",
    "Novelas",
    "Drama"
  ],
  publish: true,
  userRegister: "w7qfsa5f21",
  id: "oh3kk5moj2"
}

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let compiled: any;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [
        CommonModule,
        CoversComponent,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, {
        provide: ActivatedRoute,
        useValue: { data: of({ book: DATA }) }
      }, UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
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
