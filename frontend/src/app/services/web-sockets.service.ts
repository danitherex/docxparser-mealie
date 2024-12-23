import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketsService {
  base_domain= window.location.hostname;
  ws_url = `ws://${this.base_domain}/ws/`;
  subject: WebSocketSubject<any> | undefined;

  connect(token: string) {
    this.subject = webSocket(this.ws_url + token);
    this.subject.next({ message: 'Succesfully Connected' });
  }

  disconnectSocket() {
    this.subject?.complete();
  }
}
