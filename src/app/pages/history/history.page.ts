import { History } from './../../models/history';
import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {

  history: History[];

  constructor(
    private storageService: StorageService,
    public loadingController: LoadingController,
    private iab: InAppBrowser
  ) { }

  ionViewWillEnter() {
    this.getHistory();
  }

  async getHistory() {
    this.history = await this.storageService.getHistory();
  }

  get getSortedHistory() {
    return this.history.sort((historyA, historyB) => {
      return (new Date(historyB.date_scanned) as any) - (new Date(historyA.date_scanned) as any);
    });
  }

  clearHistory() {
    this.history = null;
    this.storageService.clearHistory();
  }

  deleteScan(history: History) {
    this.history.splice(this.history.indexOf(history), 1);
    this.storageService.setHistory(this.history);
  }

  searchScan(history: History) {
    const regexp = new RegExp('http', 'i');
    if (regexp.test(history.text)) {
      this.iab.create(history.text, '_system');
    } else {
      this.iab.create(`https://www.google.com/search?q=${history.text}`, '_system');
    }
  }

}
