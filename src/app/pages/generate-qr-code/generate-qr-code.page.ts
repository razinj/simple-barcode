import { ToastController } from '@ionic/angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-generate-qr-code',
  templateUrl: './generate-qr-code.page.html',
  styleUrls: ['./generate-qr-code.page.scss'],
})
export class GenerateQrCodePage {

  qrCodeData = null;

  constructor(
    private toastCtrl: ToastController,
    private base64ToGallery: Base64ToGallery,
    private androidPermissions: AndroidPermissions
  ) { }

  async downloadQrCode() {
    try {
      const result = await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
      if (result.hasPermission) {
        const canvas = document.querySelector('canvas') as HTMLCanvasElement;
        const imageData = canvas.toDataURL('image/png').toString().split(',')[1];
        try {
          await this.base64ToGallery.base64ToGallery(imageData, { prefix: 'qr-code-', mediaScanner: true });
          const successToast = await this.toastCtrl.create({
            message: 'QR Code saved to your gallery!',
            duration: 2000
          });
          successToast.present();
        } catch (error) {
          const errorToast = await this.toastCtrl.create({
            message: 'Error saving your QR Code!',
            duration: 2000
          });
          errorToast.present();
        }
      } else {
        const errorToast = await this.toastCtrl.create({
          header: 'Storage permission not granted.',
          message: 'Grant permission and retry downloading your QR Code.',
          buttons: [
            {
              text: 'Grant',
              handler: () => {
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
              }
            }, {
              text: 'Cancel',
              role: 'cancel',
            }]
        });
        errorToast.present();
      }
    } catch (error) {
      const errorToast = await this.toastCtrl.create({
        message: 'Error checking for storage permission.',
        duration: 2000
      });
      errorToast.present();
    }
  }

}
