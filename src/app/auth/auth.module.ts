import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptCommonModule} from "nativescript-angular/common";
import {NativeScriptFormsModule} from "nativescript-angular/forms";

import {AuthRoutingModule} from "./auth-routing.module";
import {LoginComponent} from "./login.component";

import {UserService} from "../shared/user.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        AuthRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        UserService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AuthModule {
}
