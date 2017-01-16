import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { Bowl } from "./bowl";
import { Observable } from "rxjs/Observable";

@Injectable()
export class BowlsService {

    private bowlsUrl = "api/bowls";
    constructor(private http: Http) { }

    getBowls(): Observable<Bowl[]> {

        return this.http.get(this.bowlsUrl)
            .map((response) => {
                return this.extractData(response);
            })
            .catch(this.handleError);
    }

    getBowl(id: number): Observable<Bowl> {
        return this.http.get(this.bowlsUrl + "/" + id)
            .map((response) => this.extractData(response))
            .catch(this.handleError);
    }

    saveBowl(bowl: any) {

        var body = JSON.stringify(bowl);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.bowlsUrl, body, options)
            .catch(this.handleError);
    }

    removeBowl(id: number) {

        return this.http.delete(this.bowlsUrl + "/" + id);
    }

    private extractData(response: Response): any {

        let body = response.json();

        if (body instanceof Array) {
            var result: Bowl[] = [];
            for (let obj of body)
            {
                result.push(new Bowl(obj));
            }
            return result;
        } else if (body instanceof Object) {
            return new Bowl(body);
        }

        return body || {};
    }

    private handleError(error: Response | any) {

        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error("handleError", errMsg);
        return Observable.throw(errMsg);

    }
}