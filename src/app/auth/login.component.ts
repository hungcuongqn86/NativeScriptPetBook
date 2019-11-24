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
        var myjs = this;
        firebase.login({
            type: firebase.LoginType.FACEBOOK
        }).then(function (fb_result) {
                var fb_access_token = fb_result.providers[1].token;
                console.log('fb_result', fb_result);
                myjs.router.navigate(["/home"]);
                // next: add code for checking if user is new or not
                firebase.query(
                    function (firebase_result) {

                        if (!firebase_result.error) {

                            if (firebase_result.value == null) { //user doesn't exist yet

                                //next: add code for saving the data for new user
                                /*var user_data = {
                                    'uid': fb_result.uid,
                                    'user_name': fb_result.name,
                                    'profile_photo': fb_result.profileImageURL
                                };

                                http.getJSON('https://graph.facebook.com/me?access_token=' + fb_access_token)
                                    .then(function(r){

                                        user_data.id = r.id; // facebook user ID for this specific app

                                        // create new user
                                        firebase.push(
                                            '/users',
                                            user_data
                                        ).then(
                                            function (result) {

                                                var user = {};
                                                user[result.key] = user_data; // the key is the property containing the user's data
                                                // store user's data locally
                                                applicationSettings.setString('user_key', result.key);
                                                applicationSettings.setString('user', JSON.stringify(user));
                                                applicationSettings.setString('fb_token', fb_access_token);
                                            }
                                        );

                                    });*/

                            } else {
                                // user already exists
                                console.log('firebase_result.value', firebase_result.value);
                            }
                        }

                    },
                    '/users',
                    {
                        singleEvent: true, // for checking if the value exists (return the whole data)
                        orderBy: { // the property in each of the objects in which to perform the query
                            type: firebase.QueryOrderByType.CHILD,
                            value: 'uid'
                        },
                        range: { // the comparison operator
                            type: firebase.QueryRangeType.EQUAL_TO,
                            value: fb_result.uid
                        },
                        limit: { // limit to only return the first result
                            type: firebase.QueryLimitType.FIRST,
                            value: 1
                        }
                    }
                );
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
