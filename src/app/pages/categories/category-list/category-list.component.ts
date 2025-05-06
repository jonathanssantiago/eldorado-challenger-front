import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryCreateDialogComponent } from '../category-create/category-create-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  newCategoryName = '';

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService
      .getCategories()
      .subscribe((data: any) => (this.categories = data));
  }

  createCategory() {
    if (!this.newCategoryName) return;
    this.categoryService
      .createCategory({ name: this.newCategoryName })
      .subscribe(() => {
        this.newCategoryName = '';
        this.loadCategories();
      });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.categories = this.categories.filter((cat) => cat.id !== id);
        this.snackBar.open('Category deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        console.error('Error deleting category', err);
        this.snackBar.open('Error deleting category!', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CategoryCreateDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'created') {
        this.loadCategories();
      }
    });
  }
}
