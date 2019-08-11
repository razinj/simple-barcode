import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(
    private storageService: StorageService
  ) { }

  scanBarcode() {
    this.storageService.scanBarcode();
  }

}
