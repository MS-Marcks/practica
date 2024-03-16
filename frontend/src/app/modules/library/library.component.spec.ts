import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LibraryComponent } from './library.component';

describe('LibraryComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        LibraryComponent
      ],
    }).compileComponents();
  });

  it('the component is created correctly', () => {
    const fixture = TestBed.createComponent(LibraryComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
