import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-info-toast',
  imports: [],
  templateUrl: './info-toast.component.html',
  styleUrl: './info-toast.component.css'
})
export class InfoToastComponent {
  show_success = input.required<boolean>();
  show_error = input.required<boolean>();
  file_name = input.required<string>();
  close_error = output();
  close_success = output();

  onCloseError() {
    this.close_error.emit();
  }

  onCloseSuccess() {
    this.close_success.emit();
  }

}
