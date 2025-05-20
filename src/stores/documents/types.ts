export interface Document {
  filename: string;
  filepath: string;
  extension: DocumentExtension;
}

export type DocumentExtension = 'pdf' | 'doc' |  'image' | 'table' | 'any';
