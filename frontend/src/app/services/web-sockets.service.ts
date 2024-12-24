import { Injectable ,isDevMode} from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root',
})
export class WebSocketsService {
  base_domain= window.location.hostname;
  subject: WebSocketSubject<any> | undefined;

  connect(token: string) {
    var ws_url = `ws://${this.base_domain}/ws/`;
    this.subject = webSocket(ws_url + token);
    this.subject.next({ message: 'Succesfully Connected' });
  }

  disconnectSocket() {
    this.subject?.complete();
  }
  constructor() {
    if (isDevMode()) {
      this.base_domain = 'localhost:8000';
    }
  }
}
