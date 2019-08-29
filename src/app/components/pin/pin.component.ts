import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform, } from '@ionic/angular';
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx";
import { Storage } from "@ionic/storage";
import { Router } from "@angular/router";
import { AesJsService } from "../../services/aesjs/aes-js.service";

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss'],
})
export class PinComponent implements OnInit {
  public pin: any = [];
  public ctrlPin: boolean = true;
  private currentRoute: string = null;
  constructor(
    private modalCtrl: ModalController,
    public navParams: NavParams,
    private faio: FingerprintAIO,
    private store: Storage,
    private router: Router,
    private platform: Platform,
    private aesjs: AesJsService,
  ) { }

  ngOnInit() {}

}
