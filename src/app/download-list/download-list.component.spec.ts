import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../app.component';

import { DownloadListComponent } from './download-list.component';
import { FileItem } from '../@models/fileItem.model';

describe('DownloadListComponent', () => {
  let component: DownloadListComponent;
  let fixture: ComponentFixture<DownloadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, DownloadListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DownloadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.files = [
      {
        name: 'smss.exe',
        device: 'Stark',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },

      {
        name: 'netsh.exe',
        device: 'Targaryen',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },

      {
        name: 'uxtheme.dll',
        device: 'Lannister',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
        status: 'available',
      },

      {
        name: 'cryptbase.dll',
        device: 'Martell',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
        status: 'scheduled',
      },

      {
        name: '7za.exe',
        device: 'Baratheon',
        path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
        status: 'scheduled',
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle selected downloadable items', () => {
    expect(component.selectedFiles).toEqual([]);
    component.toggleSelection(component.files[1]);
    expect(component.selectedFiles.length).toEqual(1);
  });

  it('should toggle all downloadable items', () => {
    component.toggleSelectAll();
    expect(component.selectedFiles.length).toEqual(component.files.length);
    component.toggleSelectAll();
    expect(component.selectedFiles.length).toEqual(0);
  });

  it('should only download availible files', () => {
    spyOn(window, 'alert');
    component.toggleSelectAll();
    component.downloadSelectedFiles();
    expect(window.alert).toHaveBeenCalledWith(
      'Only Available files can be downloaded. Please refine your selection.'
    );
  });

  it('should show alert when downloading files', () => {
    spyOn(window, 'alert');
    component.toggleSelection(
      component.files.find((f) => f.status === 'available') as FileItem
    );
    component.downloadSelectedFiles();
    expect(window.alert).toHaveBeenCalledWith(
      '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe - Targaryen'
    );
  });
});
