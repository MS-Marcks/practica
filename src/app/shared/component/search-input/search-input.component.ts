import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'shared-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchInputComponent {
  @Input("dataSource") dataSource: any;
  @Input("target") target!: string;
  @Input("placeholder") placeholder!: string;
  @Output("filter") filter = new EventEmitter();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      text: [null, [Validators.required, Validators.min(3)]]
    });
  }

  onChange(event: any): void {
    try {
      if (!this.form.valid) {
        this.filter.emit(this.dataSource);
        return;
      };
      if (this.target === "any") {
        const newDataSource = this.dataSource?.filter(
          (item: any) => Object.values(item).some((value: any) => value.toString().toLowerCase().includes(this.form.value.text.toLowerCase())));
        this.filter.emit(newDataSource);
        return;
      }
      const newDataSource = this.dataSource?.filter((item: any) => item[this.target].toLowerCase().includes(this.form.value.text.toLowerCase()));
      this.filter.emit(newDataSource);
    } catch (error) {
      this.filter.emit(this.dataSource);
    }
  }
}
