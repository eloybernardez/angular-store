import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

interface File {
  originalname: string;
  filename: string;
  location: string;
}
@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private apiUrl = `${environment.API_URL}/api/v1/files`;

  constructor(private http: HttpClient) {}
  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob' }).pipe(
      tap((content) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const dto = new FormData();
    // Backend uses 'file' as key
    dto.append('file', file);
    return this.http.post<File>(`${this.apiUrl}/upload`, dto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
