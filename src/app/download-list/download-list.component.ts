import { Component, Input, OnInit } from '@angular/core';
import { FileItem } from '../@models/fileItem.model';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrls: ['./download-list.component.css'],
})
export class DownloadListComponent implements OnInit {
  @Input() files: FileItem[] = [];

  constructor() {}

  ngOnInit(): void {}
}
