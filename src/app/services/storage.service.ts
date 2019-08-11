import { Injectable } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { History } from '../models/history';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { Storage } from '@ionic/storage';

const options: any = {
  prompt: '',
  showTorchButton: true,
  disableAnimations: false,
  disableSuccessBeep: false
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  async scanBarcode() {
    try {
      const result = await this.barcodeScanner.scan(options);
      if (result.cancelled) {
        this.navCtrl.navigateForward('tabs/home');
      } else {
        let history: History[] = await this.getHistory();
        history = history != null ? history : [];
        const scanData: History = {
          text: result.text,
          format: result.format,
          date_scanned: formatDate(new Date(), 'dd-MM-yyyy - hh:mm', 'en')
        };
        history.push(scanData);
        this.setHistory(history);
        this.navCtrl.navigateForward('tabs/history');
      }
    } catch (error) {
      this.showToast();
    }
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Please grant the permission to use the camera and try again.',
      duration: 4444,
      position: 'middle'
    });
    toast.present();
  }

  async getHistory() {
    try {
      let history: History[] = await this.storage.get(environment.storage_name);
      history = history ? history : null;
      return history;
    } catch (error) {
      console.log('Error getting history!', error);
    }
  }

  setHistory(history: History[]) {
    this.storage.set(environment.storage_name, history);
  }

  clearHistory() {
    this.storage.remove(environment.storage_name);
  }

}
