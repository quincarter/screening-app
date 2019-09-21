import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {HomePage} from './home/home.page';
import {LoginPage} from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
  ];
  private rootPage: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
  ) {
    const authObserver = afAuth.authState.subscribe( user => {
      console.log(user);
      if (user) {
        this.rootPage = 'HomePage';
        console.log(this.rootPage);
        authObserver.unsubscribe();
      } else {
        this.rootPage = '/login';
        this.navCtrl.navigateRoot(this.rootPage);
        console.log(this.rootPage);
        authObserver.unsubscribe();
      }
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
