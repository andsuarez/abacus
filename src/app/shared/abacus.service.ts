import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AbacusService {
    url: string = "http://dc1svofdabtwls1.ofda.gov:7202/RestWeb/rest/v0/CountryCommittedAmtVO1?limit=300&offset=0";

    constructor (private _http: Http) {};

    getData() {
        return this._http.get(this.url)
            .map((response: Response) => response.json());
    }
}