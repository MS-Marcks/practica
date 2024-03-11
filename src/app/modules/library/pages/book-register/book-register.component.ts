import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';

import { CATEGORIESINTEREST } from '../../../../shared/configs/category-interest.consts';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { SpecialValidations } from 'src/app/shared/validators/special-validations';
import { GetFormValidationErrors } from 'src/app/shared/utils/get-form-validation-errors';
import { Book } from '../../interfaces/book.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ResetForm } from 'src/app/shared/utils/reset-form';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  templateUrl: './book-register.component.html',
  styleUrls: ['./book-register.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    PichinchaDesignSystemModule,
    PichinchaReactiveControlsModule,
  ]
})
export class BookRegisterComponent {

  bookRegisterForm!: FormGroup;
  private bookService: BookService = inject(BookService);
  private userService: UserService = inject(UserService);

  categorySelected = [...CATEGORIESINTEREST];
  inputCheckedCategoryInterest: any = [];

  states: any = {
    "title": {
      state: "",
      required: false
    },
    "author": {
      state: "",
      required: false
    },
    "url": {
      state: "",
      required: false,
      url_invalid_format: false
    },
    "image": {
      state: "",
      required: false,
      url_invalid_format: false
    },
    "summary": {
      state: "",
      required: false
    },
    "publish": {
      state: "",
      required: false
    },
    "categoryInterest": {
      state: "",
      required: false
    }
  }

  alert = {
    type: "error",
    description: "",
    show: false,
    autoClose: true,
    closeTime: 5000
  }
  user: User;

  constructor(private fb: FormBuilder) {
    this.buildForm();
    this.user = this.userService.getUserCurrent();
  }

  buildForm(): void {
    this.bookRegisterForm = this.fb.group({
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      url: [null, [Validators.required, SpecialValidations.url]],
      image: [null, [Validators.required, SpecialValidations.url]],
      summary: [null, [Validators.required]],
      publish: [false],
    });
  }

  onSubmit(): void {
    GetFormValidationErrors.Errors(this.bookRegisterForm, this.states);

    if (this.inputCheckedCategoryInterest.length < 3) {
      this.states["categoryInterest"].state = "error";
      this.states["categoryInterest"].required = true;
      return;
    }

    if (this.bookRegisterForm.invalid) {
      this.bookRegisterForm.markAllAsTouched();
      return;
    }

    try {
      const body: Book = {
        title: this.bookRegisterForm.getRawValue().title,
        author: this.bookRegisterForm.getRawValue().author,
        url: this.bookRegisterForm.getRawValue().url,
        image: this.bookRegisterForm.getRawValue().image,
        summary: this.bookRegisterForm.getRawValue().summary,
        idCategory: this.categorySelected.filter((e) => e.value === true).map(e => e.label),
        publish: this.bookRegisterForm.getRawValue().publish,
        userRegister: this.user.user.userId
      }

      this.bookService.bookRegister(body).subscribe({
        next: (response) => this.setValueAlert("success", response.message),
        error: (error) => {
          if (error.status === 401) {
            this.setValueAlert("error", error.error.message);
            return;
          }
          this.setValueAlert("error", "Ops... Ocurrio un problema");
        },
        complete: () => {
          this.inputCheckedCategoryInterest = [];
          this.categorySelected = [...CATEGORIESINTEREST];
          ResetForm.reset(this.bookRegisterForm);
        }
      });

    } catch (error: any) { }
  }

  getCategoryInterest(e: Event, index: number) {
    const { detail } = e as unknown as CustomEvent;

    if (detail.checked === true) {
      this.inputCheckedCategoryInterest.push((index + 1));
      this.categorySelected[index].value = true;
      return;
    }
    this.categorySelected[index].value = false;
    this.inputCheckedCategoryInterest = this.inputCheckedCategoryInterest.filter((e: any) => {
      return e !== (index + 1);
    })
  }

  setValueAlert(alertType: string, message: any): void {
    this.alert.type = alertType;
    this.alert.description = message;
    this.alert.show = true;
  }

  handleClickCloseEvent() {
    this.alert.show = false;
  }

  trackByFn(index: number) {
    return index;
  }

}
