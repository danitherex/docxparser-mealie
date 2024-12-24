import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable,isDevMode } from '@angular/core';
import { ExtendedFile } from '../model/extendedFile.type';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  http = inject(HttpClient);

  base_domain = "";

  uploadFiles(files: ExtendedFile[], token: string) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    const headers = new HttpHeaders({
      token: `${token}`,
    });
    return this.http.post(`${this.base_domain}/upload`, formData, {
      headers: headers,
    });
  }

  constructor() {
    if (isDevMode()) {
      this.base_domain = 'http://localhost:8000';
    }
  }
}
