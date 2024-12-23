import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-send-button',
  imports: [],
  templateUrl: './send-button.component.html',
  styleUrl: './send-button.component.css',
})
export class SendButtonComponent {
  sendToBackend = output();
  buttonState = input.required<boolean>();

  onClick() {
    this.sendToBackend.emit();
  }
}
