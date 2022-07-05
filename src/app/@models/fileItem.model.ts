export interface FileItem {
  name: string;
  device: string;
  path: string;
  status: 'scheduled' | 'available';
}
