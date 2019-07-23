import { History } from './../../models/history';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  history: History[];

  constructor(
    private storageService: StorageService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  clearHistory() {}

  deleteScan(history: History) {}

}
