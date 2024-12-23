import { Component, input, output, signal } from '@angular/core';
import { ExtendedFile } from '../../model/extendedFile.type';

@Component({
  selector: 'app-attached-files',
  imports: [],
  templateUrl: './attached-files.component.html',
  styleUrl: './attached-files.component.css'
})
export class AttachedFilesComponent {
  files = input.required<Array<ExtendedFile>>();

  removeFile = output<string>();


  isFileDocx(filename: string) {
    return filename.endsWith('.docx');
  }

  onRemoveFile(fileId: string) {
    this.removeFile.emit(fileId);
  }
}
