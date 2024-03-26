import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPanelComponent } from './search-panel.component';
import { Book } from 'src/app/modules/library/interfaces/book.interface';
import { DATA_BOOK_SEARCH_PANEL, DATA_BOOK_SEARCH_PANEL_FILTER } from '../../mocks/book-search-panel.mock';
import { EventEmitter } from 'stream';


const DATA: Book[] = DATA_BOOK_SEARCH_PANEL;

let component: SearchPanelComponent;
let fixture: ComponentFixture<SearchPanelComponent>;
let compiled: any;

describe('SearchPanelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchPanelComponent
      ],
      declarations: [
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  it('return the entire object if the form is not valid', () => {
    const spy = jest.spyOn(component.filter, "emit");
    component.target = "title";
    component.dataSource = DATA_BOOK_SEARCH_PANEL;
    component.change();

    expect(spy).toHaveBeenCalledWith([])
  });

  it('filtering can be done correctly', () => {
    const spy = jest.spyOn(component.filter, "emit");
    component.target = "title";
    component.dataSource = DATA_BOOK_SEARCH_PANEL;
    component.form.controls["text"].setValue("Angular");
    component.change();

    expect(spy).toHaveBeenCalledWith(DATA_BOOK_SEARCH_PANEL_FILTER)
  });

  it('filtering can be done correctly with any', () => {
    const spy = jest.spyOn(component.filter, "emit");
    component.target = "any";
    component.dataSource = DATA_BOOK_SEARCH_PANEL;
    component.form.controls["text"].setValue("Angular");
    component.change();
    expect(spy).toHaveBeenCalled()
  });
});

