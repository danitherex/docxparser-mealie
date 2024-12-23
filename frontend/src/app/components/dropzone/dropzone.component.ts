import { Component, output } from '@angular/core';
import { ExtendedFile } from '../../model/extendedFile.type';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-dropzone',
  imports: [],
  templateUrl: './dropzone.component.html',
  styleUrl: './dropzone.component.css',
})
export class DropzoneComponent {
  filesChange = output<ExtendedFile[]>();

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files).map(file =>{
        var f = file as ExtendedFile;
        f.id = uuidv4();
        return f;
      });
      this.filesChange.emit(files);
    }
  }
}
