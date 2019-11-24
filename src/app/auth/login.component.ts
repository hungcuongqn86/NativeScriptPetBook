import {Component, OnInit, ElementRef, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {alert, prompt} from "tns-core-modules/ui/dialogs";
import {Page} from "tns-core-modules/ui/page";
import {User} from "../shared/user.model";
import {UserService} from "../shared/user.service";
import {appName} from "../const";

const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "AuthLogin",
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    appName = appName;
    isLoggingIn = true;
    user: User;

    @ViewChild("password", {static: true}) password: ElementRef;
    @ViewChild("confirmPassword", {static: true}) confirmPassword: ElementRef;

    constructor(private page: Page, private userService: UserService, private router: Router) {
        this.page.actionBarHidden = true;
        this.user = new User();
    }

    ngOnInit(): void {
        firebase.init({
            persist: true,
            // Optionally pass in properties for database, authentication and cloud messaging,
            // see their respective docs.
        }).then(
            () => {
                console.log("firebase.init done");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );
    }

    toggleForm() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit() {
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }

        if (this.isLoggingIn) {
            this.login();
        } else {
            this.register();
        }
    }

    login() {
        this.userService
            .login(this.user)
            .subscribe(res => {
                console.log(res);
                this.router.navigate(["/home"]);
            }, (error) => {
                console.log(error);
                this.alert('Đăng nhập không thành công!');
            });
    }

    loginFacebook() {
        firebase.login({
            type: firebase.LoginType.FACEBOOK
        }).then(function (fb_result) {
                console.log('facebook', fb_result);
                var fb_access_token = fb_result.providers[1].token;
                // next: add code for checking if user is new or not
            }, function (err) {
                console.log('error logging in to facebook: ', err);
            }
        );
    }

    register() {

    }

    forgotPassword() {
        prompt({
            title: "Forgot Password",
            message: "Enter the email address you used to register for APP NAME to reset your password.",
            inputType: "email",
            defaultText: "",
            okButtonText: "Ok",
            cancelButtonText: "Cancel"
        }).then((data) => {
            if (data.result) {
                /*this.userService.resetPassword(data.text.trim())
                    .then(() => {
                        this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
                    }).catch(() => {
                    this.alert("Unfortunately, an error occurred resetting your password.");
                });*/
            }
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }

    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    alert(message: string) {
        return alert({
            title: appName,
            okButtonText: "OK",
            message: message
        });
    }
}
