import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../../../services/device.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-device-list',
  imports: [MatTableModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './device-list.component.html',
})
export class DeviceListComponent implements OnInit {
  devices: any[] = [];

  constructor(private service: DeviceService) {}

  ngOnInit() {
    this.service.getAll().subscribe((data: any) => (this.devices = data));
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.ngOnInit());
  }
}
