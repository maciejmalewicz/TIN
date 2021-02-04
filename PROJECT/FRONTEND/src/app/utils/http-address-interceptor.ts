import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpAddressInterceptor implements HttpInterceptor {

    private baseUrl = "http://localhost:3000";

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let relativeUrl = req.url;
        req = req.clone({
            url: this.baseUrl + relativeUrl
        });
        return next.handle(req);
    }

}
