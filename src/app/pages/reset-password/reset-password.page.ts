import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {EmailValidator} from '../../../validations/email';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

    public resetPasswordForm: FormGroup;

    constructor(
        public authData: AuthService,
        public formBuilder: FormBuilder,
        public nav: NavController,
        public alertCtrl: AlertController
    ) {

        this.resetPasswordForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        });
    }

    resetPassword() {
        if (!this.resetPasswordForm.valid) {
            console.log(this.resetPasswordForm.value);
        } else {
            this.authData.resetPassword(this.resetPasswordForm.value.email)
                .then((user) => {
                    this.createAlert().then((data) => {
                        data.present();
                    });
                }, (error) => {
                    const errorMessage: string = error.message;
                    this.createErrorAlert(errorMessage).then((e) => {
                        e.present();
                    });
                });
        }
    }

    private async createErrorAlert(error: any) {
        return await this.alertCtrl.create({
            message: error,
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel'
                }
            ]
        });
    }

    async createAlert() {
        return await this.alertCtrl.create({
            message: 'We just sent you a reset link to your email',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    handler: () => {
                        this.nav.pop();
                    }
                }
            ]
        });
    }
}
