import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from 'rxjs';
import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "tns-core-modules/application-settings";
import {User} from "./user.model";
import {backendUrl, apiV1Url} from "../const";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': `Bearer ${getString("access_token")}`
    }),
    params: {}
};

@Injectable()
export class PetService {
    private serverUrl = backendUrl + apiV1Url;
    public module = 'pet';
    private moduleUri = 'mpet/pet/';

    constructor(private http: HttpClient) {
    }

    getPets(search: any = {}): Observable<any> {
        const url = this.serverUrl + `${this.moduleUri}mypet`;
        let params = new HttpParams();
        Object.keys(search).map((key) => {
            if (search[key]) {
                params = params.append(key, search[key]);
            }
        });
        httpOptions['params'] = params;
        return this.http.get<any>(url, httpOptions);
    }
}
