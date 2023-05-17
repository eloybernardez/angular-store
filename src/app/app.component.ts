import { Component } from '@angular/core';
import { FilesService } from './services/files.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = ''; // default value of imgParent
  showImg = true;
  imgRta = '';

  constructor(private filesService: FilesService, private http: HttpClient) {}

  onLoaded(img: string) {
    // console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  downloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        '/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        'application/pdf'
      )
      .subscribe((res) => console.log(res));
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.[0];
    if (file) {
      this.filesService
        .uploadFile(file)
        .subscribe((rta) => (this.imgRta = rta.location));
    }
  }
}

