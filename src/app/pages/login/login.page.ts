import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {EmailValidator} from '../../../validations/email';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage {

    loginForm: FormGroup;
    loading: any;

    constructor(public navCtrl: NavController,
                public authData: AuthService,
                public formBuilder: FormBuilder,
                public alertCtrl: AlertController,
                public loadingCtrl: LoadingController
    ) {

        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    goToResetPassword() {
        this.navCtrl.navigateForward('/reset-password');
    }

    createAccount() {
        this.navCtrl.navigateForward('/sign-up');
    }

    async loginUser() {
        if (!this.loginForm.valid) {
            // do something
        } else {
            this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
                .then(authData => {
                    this.navCtrl.navigateRoot('/home');
                }, error => {
                    this.loading.dismiss().then(() => {
                        this.presentAlert(error).then((a) => {
                            a.present();
                        });
                    });
                });

            this.loading = await this.loadingCtrl.create({});
            await this.loading.present();
            await this.loading.dismiss();
        }
    }

    async presentAlert(error): Promise<HTMLIonAlertElement> {
        return await this.alertCtrl.create({
            message: error.message,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ]
        });
    }
}
