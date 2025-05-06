import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeviceService } from '../../../services/device.service';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Category } from '../../../models/category.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-device-create-dialog',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './device-create-dialog.component.html',
})
export class DeviceCreateDialogComponent implements OnInit {
  deviceForm: FormGroup;
  categories: Category[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DeviceCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { device: any }
  ) {
    this.deviceForm = this.fb.group({
      categoryId: ['', Validators.required],
      color: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.pattern(/^[a-zA-Z]+$/),
        ],
      ],
      partNumber: ['', [Validators.required, Validators.min(1)]],
    });

    if (data?.device) {
      this.deviceForm.patchValue(data.device);
    }
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((data: any) => (this.categories = data));
  }

  onSubmit(): void {
    if (this.deviceForm.invalid) return;

    this.loading = true;
    const operation = this.deviceService.createDevice(this.deviceForm.value);

    operation.subscribe({
      next: () => {
        this.snackBar.open(`Device created successfully`, 'Close', {
          panelClass: ['success-snackbar'],
          duration: 3000,
        });
        this.dialogRef.close('created');
      },
      error: (err) => {
        console.error(`Error creating device`, err);
        this.snackBar.open(
          err.error?.message || `Error creating device`,
          'Close',
          { panelClass: ['error-snackbar'], duration: 5000 }
        );
        this.loading = false;
      },
    });
  }
}
