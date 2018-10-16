import { HttpHeaders } from "@angular/common/http";

export class BACK_URL{
    SERVER_URL : string = "http://localhost:4444"
    LOGIN_URL: string = this.SERVER_URL + '/login';
    PRESTATION_URL : string = this.SERVER_URL + '/prestation';
    SERVICE_URL : string = this.SERVER_URL + '/service';
    SERVICE_UPDATE_UPLOADED_IMAGE : string = this.SERVICE_URL + '/image';
    SERVICE_IMAGE_URL : string = this.SERVICE_URL + "/image/"
    HTTP_OPTIONS = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    }
}
