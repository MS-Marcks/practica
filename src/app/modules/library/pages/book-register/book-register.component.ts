import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { RouterModule } from '@angular/router';

import { CATEGORIESINTEREST } from '../../../../shared/configs/category-interest.consts';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { SpecialValidations } from 'src/app/shared/validators/special-validations';
import { Book } from '../../interfaces/book.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { ResetForm } from '../../../../shared/utils/reset-form';
import { UserService } from '../../../../shared/services/user.service';
import { GetFormControlError } from 'src/app/shared/utils/get-form-control-error';

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

  categorySelected = JSON.parse(JSON.stringify(CATEGORIESINTEREST));
  inputCheckedCategoryInterest: any = [];

  states: any = {
    title: { state: "", error: "" },
    author: { state: "", error: "" },
    url: { state: "", error: "" },
    image: { state: "", error: "" },
    summary: { state: "", error: "" }
  }

  specialStates: any = {

    categoryInterest: { state: "", required: false }
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
      title: [null, [SpecialValidations.required("Nombre de libro requerido")]],
      author: [null, [SpecialValidations.required("Nombre de autor requerido")]],
      url: [null, [SpecialValidations.required("Url del libro requerido"), SpecialValidations.url("Formato de la url no valida")]],
      image: [null, [SpecialValidations.required("Url de la imagen del libro requerido"), SpecialValidations.url("Formato de la url de la imagen no valida")]],
      summary: [null, [SpecialValidations.required()]],
      publish: [false],
    });
  }

  submit(): void {

    this.getError();
    if (this.bookRegisterForm.invalid) {
      this.bookRegisterForm.markAllAsTouched();
      return;
    }

    if (this.inputCheckedCategoryInterest.length < 3) {
      this.specialStates["categoryInterest"].state = "error";
      this.specialStates["categoryInterest"].required = true;
      return;
    }

    try {
      const body: Book = {
        title: this.bookRegisterForm.getRawValue().title,
        author: this.bookRegisterForm.getRawValue().author,
        url: this.bookRegisterForm.getRawValue().url,
        image: this.bookRegisterForm.getRawValue().image,
        summary: this.bookRegisterForm.getRawValue().summary,
        idCategory: this.categorySelected.filter((e: any) => e.value === true).map((e: any) => e.label),
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
          this.categorySelected = JSON.parse(JSON.stringify(CATEGORIESINTEREST));
          ResetForm.reset(this.bookRegisterForm);
        }
      });

    } catch (error: any) { }
  }

  getCategoryInterest(e: Event, index: number): void {
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

  getError(): void {
    Object.keys(this.states).forEach((key: string) => {
      const getError = GetFormControlError.error(this.bookRegisterForm.controls[key]);
      this.states[key] = getError;
    })
  }


  setValueAlert(alertType: string, message: any): void {
    this.alert.type = alertType;
    this.alert.description = message;
    this.alert.show = true;
  }

  handleClickCloseEvent(): void {
    this.alert.show = false;
  }

  trackByFn(index: number): number {
    return index;
  }

}
