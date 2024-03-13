import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'shared-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchPanelComponent {

  @Input("dataSource") dataSource: any = [];

  @Input("dropdown") dropdown: any;
  @Input("dropdown-value") dropdownValue: any;
  @Input("dropdown-label") dropdownLabel: any;

  @Input("checkbox") checkbox: any;
  @Input("checkbox-value") checkboxValue: any;
  @Input("checkbox-label") checkboxLabel: any;

  selectedCheckBoxForm: any = [];

  @Input("searchType") searchType: string = "text";
  @Input("target") target!: string;
  @Input("placeholder") placeholder!: string;

  @Output("filter") filter = new EventEmitter();

  form!: FormGroup;
  dataShadow: any;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      text: ["", [Validators.required]]
    });
  }

  change(): void {
    try {
      if (this.form.invalid) {
        this.filter.emit(this.dataSource);
        return;
      };
      if (this.target === "any") {
        const newDataSource = this.dataSource?.filter(
          (item: any) => Object.values(item).some((value: any) => value.toString().toLowerCase().includes(this.form.getRawValue().text.toLowerCase())));
        this.filter.emit(newDataSource);
        return;
      }
      const newDataSource = this.dataSource?.filter((item: any) => item[this.target].toString().toLowerCase().includes(this.form.getRawValue().text.toLowerCase()));
      this.filter.emit(newDataSource);
    } catch (error) {
      this.filter.emit(this.dataSource);
    }
  }

  selectedCheckbox(event: any): void {
    try {
      if (event.target.checked) {
        this.selectedCheckBoxForm.push(event.target.value);
      } else {
        this.selectedCheckBoxForm = this.selectedCheckBoxForm.filter((e: any) => e !== event.target.value);
      }
      if (this.selectedCheckBoxForm.length === 0) {
        this.filter.emit(this.dataSource);
        return;
      }
      const newDataSource = this.dataSource?.filter((item: any) => {
        if (typeof item[this.target] === "object") {
          return (item[this.target].filter((element: any) => this.selectedCheckBoxForm.includes(element.toString()))).length > 0
        }
        return (this.selectedCheckBoxForm.includes(item[this.target].toString())) === true
      });
      this.filter.emit(newDataSource);
    } catch (error) {
      this.filter.emit(this.dataSource);
    }
  }

  trackByFn(index: number): number {
    return index;
  }
}
