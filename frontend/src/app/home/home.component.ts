import { Component, inject, signal } from '@angular/core';
import { TokenInputComponent } from '../components/token-input/token-input.component';
import { DropzoneComponent } from '../components/dropzone/dropzone.component';
import { AttachedFilesComponent } from '../components/attached-files/attached-files.component';
import { SendButtonComponent } from '../components/send-button/send-button.component';
import { ConfirmPopupComponent } from '../components/confirm-popup/confirm-popup.component';
import { FileUploadService } from '../services/file-upload.service';
import { ExtendedFile } from '../model/extendedFile.type';
import { WebSocketsService } from '../services/web-sockets.service';
import { InfoToastComponent } from '../components/info-toast/info-toast.component';

@Component({
  selector: 'app-home',
  imports: [
    TokenInputComponent,
    DropzoneComponent,
    AttachedFilesComponent,
    SendButtonComponent,
    ConfirmPopupComponent,
    InfoToastComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  files = signal<ExtendedFile[]>([]);
  dialogueState = signal<boolean>(false);
  token = signal('');
  showSuccess = signal(false);
  showError = signal(false);
  notification_file_name = signal('');
  fileUploadService = inject(FileUploadService);
  websocket = inject(WebSocketsService);

  updateFiles(files: ExtendedFile[]) {
    this.files.set(files);
  }

  removeFile(fileID: string) {
    this.files.update((files) => files.filter((f) => f.id !== fileID));
  }

  updateToken(token: string) {
    this.token.set(token);
    this.websocket.connect(token);
    this.recieveWebsoketMessages();
  }

  updateDialogueState(state: boolean) {
    this.dialogueState.set(state);
  }

  sendToBackend() {
    this.updateDialogueState(true);
  }

  uploadFiles() {
    console.log('Uploading files');
    this.fileUploadService
      .uploadFiles(this.files(), this.token())
      .subscribe((response) => {
        console.log(response);
      });
  }

  recieveWebsoketMessages() {
    this.websocket.subject?.subscribe({
      next: (msg) => {
        console.log(msg);
        this.notification_file_name.set(msg.filename);
        if(msg.success){
          this.showSuccess.set(true);
        }else{
          this.showError.set(true);
        }
      },
      error: (err) => console.log(err),
    });
  }

  disconnectSocket() {
    this.websocket.disconnectSocket();
  }

  close_success() {
    this.showSuccess.set(false);
  }

  close_error() {
    this.showError.set(false);
  }

  ngOnDestroy() {
    this.disconnectSocket();
  }
}
