import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ExtendedFile } from '../model/extendedFile.type';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  http = inject(HttpClient);

  uploadFiles(files: ExtendedFile[], token: string) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    const headers = new HttpHeaders({
      token: `${token}`,
    });
    return this.http.post(`/upload`, formData, {
      headers: headers,
    });
  }
}
