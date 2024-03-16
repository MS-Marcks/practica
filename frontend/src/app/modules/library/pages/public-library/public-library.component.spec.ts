import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from '@angular/forms';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';

import { PublicLibraryComponent } from './public-library.component';
import { SearchPanelComponent } from '../../../../shared/component/search-panel/search-panel.component';
import { CoversComponent } from '../../components/covers/covers.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PrincipalInterceptorService } from '../../../../shared/interceptors/principal.interceptor.service';
import { BookService } from '../../services/book.service';

describe('PublicLibraryComponent', () => {
  let component: PublicLibraryComponent;
  let fixture: ComponentFixture<PublicLibraryComponent>;
  let compiled: any;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicLibraryComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        PichinchaDesignSystemModule,
        PichinchaReactiveControlsModule,
        SearchPanelComponent,
        CoversComponent
      ], providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: PrincipalInterceptorService,
        multi: true
      }, BookService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
    bookService = TestBed.inject(BookService)
  })

  it('the component is created correctly', () => {
    expect(component).toBeTruthy();
  });

  test('Called method getBooks in book service correctly', () => {
    component.user = { "user": { "userId": "w7qfsa5f21", "username": "ksuarez" }, "access_token": "", "tokenType": "" }
    const service = jest.spyOn(bookService, "getBooks")
    component.ngOnInit();
    fixture.detectChanges();
    expect(service).toHaveBeenCalled();
  });

  test('Called method getPublicBooks in catalog service correctly', () => {
    component.user = { "user": { "userId": "w7qfsa5f21", "username": "ksuarez" }, "access_token": "", "tokenType": "" }
    const service = jest.spyOn(bookService, "getPublicBooks")
    component.ngOnInit();
    fixture.detectChanges();
    expect(service).toHaveBeenCalled();
  });

});
