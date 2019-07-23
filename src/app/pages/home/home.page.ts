import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit() {}

  public scanBarcode() {
    this.storageService.scanBarcode();
  }

}
