import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-token-input',
  imports: [FormsModule],
  templateUrl: './token-input.component.html',
  styleUrl: './token-input.component.css',
  providers: [LocalStorageService],
})
export class TokenInputComponent {
  tokenValue = signal('');
  showInput = signal(true);
  token = output<string>();

  localStorageService = inject(LocalStorageService);

  ngOnInit() {
    var token = this.localStorageService.getTokenFromStorage();
    if (token) {
      this.tokenValue.set(token);
      this.updateToken();
    }
  }

  updateToken() {
    if (this.tokenValue() != '') {
      this.token.emit(this.tokenValue());
      this.localStorageService.saveTokenToStorage(this.tokenValue());
      this.toggleShowInput();
    }
  }

  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.updateToken();
    }
  }

  toggleShowInput() {
    this.showInput.update((show) => !show);
  }
}
