import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AbacusService {
    dashboardMapQueryVO1: string = "http://dc1svofdabtwls1:7201/abacus-rest-svc/rest/v0/DashboardMapQueryVO1?finder=RestFilter;";

    // homePageMapRegionCountryVO1: string = "http://dc1svofdabtwls1:7201/abacus-rest-svc/rest/v0/HomePageMapRegionCountryVO1?finder=RestFilter";

    // homePageMapRegionCountryProjectVO1: string = 'http://dc1svofdabtwls1:7201/abacus-rest-svc/rest/v0/HomePageMapRegionCountryProjectVO1?finder=RestFilter';

    // HomePageMapRegionCountrySectorVO1: string = 'http://dc1svofdabtwls1:7201/abacus-rest-svc/rest/v0/HomePageMapRegionCountrySectorVO1?finder=RestFilter';

    constructor (private _http: Http) {};

    getdashboardMapQueryVO1Data() {
        return this._http.get(this.dashboardMapQueryVO1)
            .map((response: Response) => response.json());
    }

    // gethomePageMapRegionCountryVO1Data() {
    //     return this._http.get(this.homePageMapRegionCountryVO1)
    //         .map((response: Response) => response.json());
    // }

    // gethomePageMapRegionCountryProjectVO1Data() {
    //     return this._http.get(this.homePageMapRegionCountryProjectVO1)
    //         .map((response: Response) => response.json());
    // }

    // getHomePageMapRegionCountrySectorVO1Data() {
    //     return this._http.get(this.HomePageMapRegionCountrySectorVO1)
    //         .map((response: Response) => response.json());
    // }
}