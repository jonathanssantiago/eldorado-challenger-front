import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-category-create-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './category-create-dialog.component.html',
  styles: [
    `
      .full-width {
        width: 100%;
        margin: 16px 0;
      }
    `,
  ],
})
export class CategoryCreateDialogComponent {
  categoryForm: FormGroup;
  loading = false;

  constructor(
    private dialogRef: MatDialogRef<CategoryCreateDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  createCategory() {
    if (this.categoryForm.invalid) return;

    this.loading = true;
    this.categoryService.createCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.snackBar.open('Category created successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close('created');
      },
      error: (err) => {
        console.error('Error creating category', err);
        this.snackBar.open(
          err.error?.message || 'Error creating category. Please try again.',
          'Close',
          { duration: 5000 }
        );
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
