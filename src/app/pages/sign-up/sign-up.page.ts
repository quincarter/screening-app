import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {EmailValidator} from '../../../validations/email';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
    signupForm: FormGroup;
    loading: any;

    constructor(public nav: NavController, public authData: AuthService,
                public formBuilder: FormBuilder, public loadingCtrl: LoadingController,
                public alertCtrl: AlertController) {

        this.signupForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    }

    /**
     * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
     *  component while the user waits.
     *
     * If the form is invalid it will just log the form value, feel free to handle that as you like.
     */
    async signupUser() {
        if (!this.signupForm.valid) {
            console.log(this.signupForm.value);
        } else {
            this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password)
                .then(() => {
                    this.nav.navigateRoot('home');
                }, (error) => {
                    this.loading.dismiss().then(() => {
                        const errorMessage: string = error.message;
                        this.createAlert(errorMessage).then((d) => {
                            d.present();
                        });
                    });
                });

            this.loading = this.loadingCtrl.create({});
            await this.loading.present();
            await this.loading.dismiss();
        }
    }

    private async createAlert(errorMessage) {
        return await this.alertCtrl.create({
            message: errorMessage,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ]
        });
    }
}
