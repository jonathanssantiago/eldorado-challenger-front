import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from '../../../services/device.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { Device } from '../../../models/device.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { DeviceCreateDialogComponent } from '../device-create/device-create-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-device-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './device-list.component.html',
})
export class DeviceListComponent implements OnInit {
  devices: Device[] = [];
  displayedColumns: string[] = ['category', 'color', 'partNumber', 'actions'];
  loading = true;

  constructor(
    private service: DeviceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDevices();
  }

  loadDevices(): void {
    this.loading = true;
    this.service.getDevices().subscribe({
      next: (devices) => {
        this.devices = devices;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading devices', err);
        this.loading = false;
        this.snackBar.open('Error loading devices', 'Close', {
          panelClass: ['error-snackbar'],
          duration: 5000,
        });
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DeviceCreateDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'created') {
        this.loadDevices();
      }
    });
  }

  deleteDevice(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Device',
        message: 'Are you sure you want to delete this device?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.service.deleteDevice(id).subscribe({
          next: () => {
            this.devices = this.devices.filter((device) => device.id !== id);
            this.snackBar.open('Device deleted successfully', 'Close', {
              panelClass: ['success-snackbar'],
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Error deleting device', err);
            this.snackBar.open('Error deleting device', 'Close', {
              panelClass: ['error-snackbar'],
              duration: 5000,
            });
          },
        });
      }
    });
  }
}
