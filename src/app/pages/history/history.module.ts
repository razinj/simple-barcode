import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HistoryPage } from './history.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

const routes: Routes = [{ path: '', component: HistoryPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HistoryPage
  ],
  providers: [
    InAppBrowser
  ]
})
export class HistoryPageModule { }
