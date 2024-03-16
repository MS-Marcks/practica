import { TestBed } from '@angular/core/testing';
import { SearchPanelComponent } from './search-panel.component';

describe('LibraryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SearchPanelComponent
      ],
      declarations: [
      ],
    }).compileComponents();
  });

  it('the component is created correctly', () => {
    const fixture = TestBed.createComponent(SearchPanelComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
