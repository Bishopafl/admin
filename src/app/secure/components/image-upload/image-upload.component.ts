import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Output('fileUploaded') fileUploadedEmitter = new EventEmitter<string>();

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
  }

  upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const data = new FormData(); // we don't want data to be json, we want to send a file
    data.append('image', file);

    this.imageService.upload(data).subscribe(
      (res: any) => {
        this.fileUploadedEmitter.emit(res.url);
      }
    );

  }

}
