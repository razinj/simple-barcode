import { History } from './../../models/history';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  history: History[];

  constructor(
    private storageService: StorageService,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private iab: InAppBrowser
  ) { }

  async ngOnInit() {
    this.history = await this.storageService.getHistory();
  }

  clearHistory() {
    this.history = [];
    this.storageService.clearHistory();
  }

  deleteScan(history: History) {
    this.history.splice(this.history.indexOf(history), 1);
    this.storageService.setHistory(this.history);
  }

  searchScan (history: History) {
    this.iab.create(`https://www.google.com/search?q=${history.text}`, '_system');
  }

}
