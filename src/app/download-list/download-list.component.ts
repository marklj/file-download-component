import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../@models/fileItem.model';
@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrls: ['./download-list.component.css'],
})
export class DownloadListComponent implements OnInit {
  @Input() files: FileItem[] = [];
  selectedFiles: FileItem[] = [];

  constructor() {}

  ngOnInit(): void {}

  toggleSelection(file: FileItem) {
    if (this.fileIsSelected(file)) {
      this.selectedFiles = this.selectedFiles.filter((selectedFile) => {
        return selectedFile.path !== file.path;
      });
    } else {
      this.selectedFiles = [...this.selectedFiles, file];
    }
  }

  toggleSelectAll() {
    if (this.selectedFiles.length < this.files.length) {
      this.selectedFiles = this.files;
    } else {
      this.selectedFiles = [];
    }
  }

  fileIsSelected(file: FileItem) {
    return this.selectedFiles.find((selectedFile) => {
      return file.path === selectedFile.path;
    });
  }

  downloadSelectedFiles() {
    if (!this.selectedFiles.length) return;
    if (this.selectedFiles.find((file) => file.status === 'scheduled')) {
      alert(
        'Only Available files can be downloaded. Please refine your selection.'
      );
      return;
    }
    alert(this.selectedFiles.map((f) => `${f.path} - ${f.device}`).join(', '));
  }
}
