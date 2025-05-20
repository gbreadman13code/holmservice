import { api } from '@/api/axios';
import { BaseResponse } from '@/api/types';
import { makeAutoObservable } from 'mobx';
import { Document } from './types';



export interface TermsSection {
  id: number;
  title: string;
  subtitle?: string;
  content: Array<{
    type: 'paragraph' | 'list' | 'heading';
    text: string;
    items?: string[]; // для списков
  }>;
}

interface TermsContent {
  id: number;
  name: string;
  content: string; // HTML контент
}

class DocumentsStore {
  templateDocuments: Document[] = [];
  termsContent: TermsContent | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  async getTemplateDocuments() {
    this.setLoading(true);
    try {
      const response = await api.get<BaseResponse<Document>>('template-documents/');
      this.templateDocuments = response.data.results;
      
    } finally {
      this.setLoading(false);
    }
    return this.templateDocuments;
  }

  async getTermsContent() {
    this.setLoading(true);
    try {
      const response = await api.get<BaseResponse<TermsContent>>('terms-and-agreements/');
      this.termsContent = response.data.results[0];
    } finally {
      this.setLoading(false);
    }
    return this.termsContent;
  }
}

export const documentsStore = new DocumentsStore(); 