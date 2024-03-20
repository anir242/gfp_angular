import {Component, Input, OnInit} from '@angular/core';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {BaseComponent} from '../../pages/_base/base/base.component';
import {ImagesService} from '../../_services/images.service';
import {ImageTypes} from '../../_models/components/image-types';
import {Response} from '../../_models/api/response';
import {ImagesInterface} from '../../_models/api/images-interface';
import {UntypedFormControl} from '@angular/forms';
import {StorageName} from '../../_models/components/storage-name';
import {UsersInterface} from '../../_models/api/users/users-interface';
import {UsersService} from '../../_services/users/users.service';

@Component({
  selector: 'app-upload-logo',
  templateUrl: './upload-logo.component.html',
  styleUrls: ['./upload-logo.component.scss']
})
export class UploadLogoComponent extends BaseComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() imageTypes: string;
  @Input() imageFormControl: UntypedFormControl;

  constructor(
    private imagesService: ImagesService,
    private usersService: UsersService
  ) {
    super();
  }



  public files: NgxFileDropEntry[] = [];

  ngOnInit(): void {
  }

  public dropped(files: NgxFileDropEntry[]): void {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file(async (file: File) => {

          // Here you can access the real file

          const form = new FormData();
          form.append('type', this.imageTypes);
          form.append('filename', droppedFile.relativePath);
          form.append('image', file);


          try {
            const response: Response<ImagesInterface> = await this.imagesService.uploadImage(form);
            if (response?.success) {
              window.location.reload();
              this.imageUrl = response.data.url;
              if (this.imageFormControl) {
                this.imageFormControl.setValue(response.data.id);
              }
            } else {
              this.showErrorResponse(response);
            }
          } catch (e) {
            this.showErrorResponse(e);
          }



        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  public fileOver(event): void {
  }

  public fileLeave(event): void {
  }

}
