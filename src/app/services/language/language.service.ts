import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    selected = '';

    constructor(
        private translate: TranslateService,
        private storage: Storage,
        ) {
    }

    static getLanguages() {
        return [
            {text: 'Inglés', value: 'en'},
            {text: 'Español', value: 'es'},
        ];
    }

    setInitialAppLanguage() {
        let language = this.translate.getBrowserLang();
        this.translate.setDefaultLang(language);

        this.storage.get(LNG_KEY).then(async val => {
            if (val) {
                await this.setLanguage(val);
                this.selected = val;
            } else {
                await this.setLanguage(language)
            }
        });
    }

    async setLanguage(lng) {
        this.translate.use(lng);
        this.selected = lng;
        await this.storage.set(LNG_KEY, lng);
    }
}
