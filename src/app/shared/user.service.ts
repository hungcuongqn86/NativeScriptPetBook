import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "./user.model";
import {backendUrl, apiV1Url} from "../const";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {
    private serverUrl = backendUrl + apiV1Url;

    constructor(private http: HttpClient) {
    }

    login(data: User) {
        const url = this.serverUrl + `login`;
        return this.http.post(url, data, httpOptions);
    }
}
