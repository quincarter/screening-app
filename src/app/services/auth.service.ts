import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private isAuthorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public readonly isAuthorized$: Observable<boolean> = this.isAuthorized.asObservable();

    constructor(
        public afAuth: AngularFireAuth
    ) {
    }

    setAuthorized(value) {
        this.isAuthorized.next(value);
    }

    loginUser(newEmail: string, newPassword: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    }

    resetPassword(email: string): Promise<void> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }

    logoutUser(): Promise<void> {
        return this.afAuth.auth.signOut();
    }

    signupUser(newEmail: string, newPassword: string): Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
    }
}
