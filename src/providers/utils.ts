import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Utils {
    
    handleError( error: Response ) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error( JSON.stringify( error ) );
        return Observable.throw( error );
    }
  
}