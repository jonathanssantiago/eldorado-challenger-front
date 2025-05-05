import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeviceService } from '../../../services/device.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
})
export class DeviceFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: DeviceService,
    private categoryService: CategoryService
  ) {}

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    categoryId: ['', Validators.required],
  });

  categories: any[] = [];

  ngOnInit(): void {
    this.categoryService
      .getAll()
      .subscribe((data: any) => (this.categories = data));
  }

  submit() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe();
    }
  }
}
