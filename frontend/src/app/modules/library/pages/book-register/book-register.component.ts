import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PichinchaDesignSystemModule, PichinchaReactiveControlsModule } from '@pichincha/ds-angular';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { CATEGORIESINTEREST } from '../../../../shared/configs/category-interest.consts';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { CustomValidations } from '../../../../shared/validations/custom-validations.validations';
import { Book } from '../../interfaces/book.interface';
import { User } from '../../../../shared/interfaces/user.interface';
import { ResetForm } from '../../../../shared/utils/reset-form';
import { UserService } from '../../../../shared/services/user.service';
import { GetFormControlError } from '../../../../shared/utils/get-form-control-error';

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
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class BookRegisterComponent {

  bookRegisterForm!: FormGroup;
  bookUpdate!: Book;
  isUpdate: boolean = false;

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

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.user = this.userService.getUserCurrent();
  }

  ngOnInit(): void {
    //check if a book is to be edited
    this.route.data.subscribe(({ book }) => {
      if (!book) return;
      this.isUpdate = true;
      this.bookUpdate = book;
    });
    this.buildForm();
  }

  buildForm(): void {
    this.bookRegisterForm = this.fb.group({
      id: [(this.bookUpdate === undefined) ? null : this.bookUpdate.id],
      title: [(this.bookUpdate === undefined) ? null : this.bookUpdate.title, [CustomValidations.required("Nombre de libro requerido")]],
      author: [(this.bookUpdate === undefined) ? null : this.bookUpdate.author, [CustomValidations.required("Nombre de autor requerido")]],
      url: [(this.bookUpdate === undefined) ? null : this.bookUpdate.url, [CustomValidations.required("Url del libro requerido"), CustomValidations.url("Formato de la url no valida")]],
      image: [(this.bookUpdate === undefined) ? null : this.bookUpdate.image, [CustomValidations.required("Url de la imagen del libro requerido"), CustomValidations.url("Formato de la url de la imagen no valida")]],
      summary: [(this.bookUpdate === undefined) ? null : this.bookUpdate.summary, [CustomValidations.required()]],
      publish: [(this.bookUpdate === undefined) ? false : this.bookUpdate.publish],
    });

    if (this.isUpdate) {
      this.categorySelected.forEach((e: any, index: number) => {
        this.bookUpdate.idCategory?.forEach((ei: any) => {
          if (ei === e.label) {
            this.inputCheckedCategoryInterest.push((index + 1));
            this.categorySelected[index].value = true;
          }
        })
      })
    }
  }

  submit(): void {

    //gets the errors
    this.getError();
    if (this.bookRegisterForm.invalid) {
      this.bookRegisterForm.markAllAsTouched();
      return;
    }

    // customized validation for categories
    if (this.inputCheckedCategoryInterest.length < 3) {
      this.specialStates["categoryInterest"].state = "error";
      this.specialStates["categoryInterest"].required = true;
      return;
    }

    try {
      const body: Book = {
        id: this.bookRegisterForm.getRawValue().id,
        title: this.bookRegisterForm.getRawValue().title,
        author: this.bookRegisterForm.getRawValue().author,
        url: this.bookRegisterForm.getRawValue().url,
        image: this.bookRegisterForm.getRawValue().image,
        summary: this.bookRegisterForm.getRawValue().summary,
        idCategory: this.categorySelected.filter((e: any) => e.value === true).map((e: any) => e.label),
        publish: this.bookRegisterForm.getRawValue().publish,
        userRegister: this.user.user.userId
      }

      // editing is enabled
      if (this.isUpdate) {
        this.bookService.bookUpdate(body).subscribe({
          next: (response) => this.setValueAlert("success", response.message),
          error: (error) => {
            if (error.status === 401) {
              this.setValueAlert("error", error.error.message);
              return;
            }
            this.setValueAlert("error", "Ops... Ocurrio un problema");
          }
        });
        return;
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

    // add if a checkbox was checked
    if (detail.checked === true) {
      this.inputCheckedCategoryInterest.push((index + 1));
      this.categorySelected[index].value = true;
      return;
    }
    this.categorySelected[index].value = false;

    // remove if a checkbox was unchecked
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
