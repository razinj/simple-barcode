import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastController, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { History } from '../models/history';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';

const options: any = {
  showTorchButton: true,
  disableAnimations: false,
  disableSuccessBeep: false
};

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private nativeStorage: NativeStorage,
    private barcodeScanner: BarcodeScanner,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  async scanBarcode() {
    try {
      const result = await this.barcodeScanner.scan(options);
      if (!result.cancelled) {
        const history: History[] = await this.getHistory();
        const scanData: History = {
          text: result.text,
          format: result.format,
          date_scanned: formatDate(new Date(), 'dd-MM-yyyy - hh:mm', 'en')
        };
        history.push(scanData);
        this.setHistory(history);
        this.navCtrl.navigateRoot('tabs/history');
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
      let history = await this.nativeStorage.getItem(environment.storage_name);
      history = history ? history : [];
      return history;
    } catch (error) {
      console.log('Error getting history!', error);
    }
  }

  setHistory(history: History[]) {
    this.nativeStorage.setItem(environment.storage_name, history);
  }

  clearHistory() {
    this.nativeStorage.remove(environment.storage_name);
  }

}
