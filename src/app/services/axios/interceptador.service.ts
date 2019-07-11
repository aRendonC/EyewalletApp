import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {AlertController, NavController} from '@ionic/angular';
import {AuthService} from '../auth/auth.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TimerService} from '../timer/timer.service';
import {LoadingService} from "../loading/loading.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptadorService implements HttpInterceptor {

  constructor(
    private storage: Storage,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private timer: TimerService,
    private loadCtrl: LoadingService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLogin()) {
      const user: any = this.storage.get('user')
      const token = user.accessToken;
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token
          }
        });
      }

      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          }
        });
      }

      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('esta es la respuesta del interceptador', error)
          if (error.status === 401) {
            this.logout();
            this.navCtrl.navigateRoot('/login');
          }
          return throwError(error);
        }));
    } else {
      return next.handle(request);
    }
  }


  async logout() {
    await this.storage.remove('user')
    await this.storage.clear();
    // this.timer.resetTimer();
    await this.navCtrl.navigateRoot('/login');
    await this.presentAlerta();
  }

  async presentAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'INFORMACIÓN',
      subHeader: 'Sesión terminada',
      message: 'Señor usuario por seguridad su sesión ha sido expirada.',
      buttons: ['cerrar']
    });

    await alert.present();
  }
}
