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
      const user: any = this.storage.get('user');
      const token = user.accessToken;
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token,
          }
        });
      }

      if (!request.headers.has('Content-Type')) {
        request = request.clone({
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
          if (error.status === 401) {
            this.logout();
            this.navCtrl.navigateRoot('/login');
          } if (error.status === 502) {
            this.presentAlerta('!!Tenemos errores internos', 'Ocurrió un error');
            this.loadCtrl.dismiss()
          }if (error.status === 0) {
            this.presentAlerta('!!Tenemos errores internos', 'Ocurrió un error');
            this.loadCtrl.dismiss()
          } if (error.status === 500) {
            this.presentAlerta('Ocurrió un error inesperado, por favor intenta nuevamente en unos minutos', 'Ocurrió un error');
            this.loadCtrl.dismiss()
          }
          return throwError(error);
        }));
    } else {
      return next.handle(request);
    }
  }


  async logout() {
    await this.storage.remove('user');
    await this.storage.clear();
    await this.navCtrl.navigateRoot('/login');
    await this.presentAlerta('', '');
  }

  async presentAlerta(text, subHeader) {
    const alert = await this.alertCtrl.create({
      header: 'INFORMACIÓN',
      subHeader: subHeader,
      message: text,
      buttons: ['cerrar']
    });

    await alert.present();
  }
}
