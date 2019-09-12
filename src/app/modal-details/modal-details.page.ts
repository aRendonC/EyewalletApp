import { Component, OnInit, Input } from '@angular/core';
import { NavParams, NavController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from '../services/language/language.service';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.page.html',
  styleUrls: ['./modal-details.page.scss'],
})
export class ModalDetailsPage implements OnInit {
  @Input() datos;
  languages = [];
  selectedLanguage = '';
  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private router: Router,
    private translateService: TranslateService,
    private languageService: LanguageService,
  ) { }

  ngOnInit() {
    this.languages = LanguageService.getLanguages();
    this.selectedLanguage = this.languageService.selected;
    this.loadData();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  loadData(){
    console.log(this.datos);
  }

  async selectLanguage() {
    console.log(this.selectedLanguage)
    await this.languageService.setLanguage(this.selectedLanguage)
  }


}
