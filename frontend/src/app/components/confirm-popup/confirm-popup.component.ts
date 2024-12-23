import { Component, HostListener, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  imports: [],
  templateUrl: './confirm-popup.component.html',
  styleUrl: './confirm-popup.component.css',
})
export class ConfirmPopupComponent {
  showDialogue = input.required<boolean>();
  fileCount = input.required<number>();
  dialogueState = output<boolean>();
  uploadFiles = output<void>();

  closeModal() {
    this.dialogueState.emit(false);
  }

  confirmUpload() {
    this.uploadFiles.emit();
    this.closeModal();
  }

  @HostListener('document:keydown', ['$event'])
  onEscapePressed(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

}
