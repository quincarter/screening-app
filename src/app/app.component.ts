import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from './services/auth.service';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        }
    ];
    private rootPage: any;
    public isAuthorized: boolean;
    private authSubscription: Subscription;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private afAuth: AngularFireAuth,
        private navCtrl: NavController,
        private authService: AuthService,
    ) {
        this.checkUserAuth();
        this.initializeApp();
    }

    ngOnInit(): void {
        this.getAuthSubscription();
        this.checkUserAuth();
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    private checkUserAuth() {
        const authObserver = this.afAuth.authState.subscribe(user => {
            this.isAuthorized = !!user;
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

    logout() {
        this.authService.logoutUser();
        location.reload();
    }

    private getAuthSubscription() {
        this.authSubscription = this.authService.isAuthorized$.subscribe(data => {
            this.isAuthorized = data;
        });
    }
}
