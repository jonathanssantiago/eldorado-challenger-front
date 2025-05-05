import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
})
export class CategoryFormComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(128)]],
  });

  constructor(private fb: FormBuilder, private service: CategoryService) {}

  submit() {
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe();
    }
  }
}
