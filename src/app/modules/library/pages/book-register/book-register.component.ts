import { Component } from '@angular/core';
import { categoriesInterest } from '../../../../shared/configs/category-interest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { SpecialValidations } from 'src/app/shared/validators/special-validations';
import { GetFormValidationErrors } from 'src/app/shared/utils/get-form-validation-errors';
import { Book } from '../../interfaces/book.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { ResetForm } from 'src/app/shared/utils/reset-form';
//import { ResetForm } from 'src/app/shared/utils/reset-form';

@Component({
  selector: 'app-book-register',
  templateUrl: './book-register.component.html',
  styleUrls: ['./book-register.component.scss']
})
export class BookRegisterComponent {

  bookRegisterForm!: FormGroup;
  categorySelected = [...categoriesInterest];
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

  constructor(private fb: FormBuilder, private service: BookService) {
    this.buildForm();
    this.user = JSON.parse(localStorage.getItem("user") || "[]");

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

  async onSubmit(): Promise<void> {
    GetFormValidationErrors.Errors(this.bookRegisterForm, this.states);

    if (this.inputCheckedCategoryInterest.length < 3) {
      this.states["categoryInterest"].state = "error";
      this.states["categoryInterest"].required = true;
      return;
    }

    if (!this.bookRegisterForm.valid) {
      this.bookRegisterForm.markAllAsTouched();
      return;
    }

    try {
      const body: Book = {
        title: this.bookRegisterForm.value.title,
        author: this.bookRegisterForm.value.author,
        url: this.bookRegisterForm.value.url,
        image: this.bookRegisterForm.value.image,
        summary: this.bookRegisterForm.value.summary,
        idCategory: this.categorySelected.filter((e) => e.value === true).map(e => e.label),
        publish: this.bookRegisterForm.value.publish,
        userRegister: this.user.user.userId
      }

      const response = await this.service.bookRegister(body);
      this.setValueAlert("success", response.message);
      this.inputCheckedCategoryInterest = [];
      this.categorySelected = [...categoriesInterest];
      ResetForm.reset(this.bookRegisterForm);

    } catch (error: any) {
      if (error.status === 401) {
        this.setValueAlert("error", error.error.message);
        return;
      }
      this.setValueAlert("error", "Ops... Ocurrio un problema");
    }
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