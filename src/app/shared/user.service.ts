import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user.model";
import {backendUrl, apiV1Url} from  "../const";

@Injectable()
export class UserService {
    private serverUrl = backendUrl + apiV1Url;

    constructor(private http: HttpClient) {
    }

    login(data: User) {
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl + `login`, {data}, {headers: options});
    }

    private createRequestOptions() {
        return new HttpHeaders({
            "Content-Type": "application/json"
        });
    }
}
