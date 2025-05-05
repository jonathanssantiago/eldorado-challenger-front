import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './category-list.component.html',
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  newCategoryName = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService
      .getAll()
      .subscribe((data: any) => (this.categories = data));
  }

  createCategory() {
    if (!this.newCategoryName) return;
    this.categoryService
      .create({ name: this.newCategoryName })
      .subscribe(() => {
        this.newCategoryName = '';
        this.loadCategories();
      });
  }

  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(() => this.loadCategories());
  }
}
