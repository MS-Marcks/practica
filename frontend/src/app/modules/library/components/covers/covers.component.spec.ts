import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { CoversComponent } from './covers.component';
import { Book } from '../../interfaces/book.interface';

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

describe('CoversComponent', () => {
  let component: CoversComponent;
  let fixture: ComponentFixture<CoversComponent>;
  let compiled: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CoversComponent,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoversComponent);
    component = fixture.componentInstance;
    component.data = DATA;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  it('change value isLoading', () => {
    component.load();
    fixture.detectChanges();
    expect(component.isLoading).toBe(false)
  });

  it('change value event error', () => {
    let event = { target: { src: "" } }
    component.error(event);
    fixture.detectChanges();
    expect(event.target.src).toBe("assets/img/error.png")
  });


});
