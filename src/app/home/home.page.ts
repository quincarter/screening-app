import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {NavController} from '@ionic/angular';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
    private isAuthorized: boolean;
    private rootPage: any;
    private authSubscription: Subscription;

    constructor(
        private afAuth: AngularFireAuth,
        private navCtrl: NavController,
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.getAuthSubscription();
        this.checkUserAuth();
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    private checkUserAuth() {
        const authObserver = this.afAuth.authState.subscribe(user => {
            this.authService.setAuthorized(!!user);
            if (user) {
                this.rootPage = '/home';
                this.navCtrl.navigateRoot(this.rootPage);
                authObserver.unsubscribe();
            } else {
                this.rootPage = '/login';
                this.navCtrl.navigateRoot(this.rootPage);
                authObserver.unsubscribe();
            }
        });
    }

    private getAuthSubscription() {
        this.authSubscription = this.authService.isAuthorized$.subscribe(data => {
            this.isAuthorized = data;
        });
    }
}
