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

  onChange(): void {
    try {
      if (!this.form.valid) {
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

  trackByFn(index: number) {
    return index;
  }
}
