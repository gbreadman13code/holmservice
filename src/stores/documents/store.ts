import { makeAutoObservable } from 'mobx';

export type DocumentExtension = 'pdf' | 'doc' | 'docx';

export interface Document {
  id: number;
  title: string;
  extension: DocumentExtension;
  url: string;
  size: string;
}

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
  content: string; // HTML контент
}

class DocumentsStore {
  rsoDocuments: Document[] = [];
  templateDocuments: Document[] = [];
  termsContent: TermsContent | null = null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  async getRsoDocuments() {
    this.setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.rsoDocuments = [
        {
          id: 1,
          title: 'Договор с ООО "КрасКом" на водоснабжение',
          extension: 'pdf',
          url: '/documents/rso/water-contract.pdf',
          size: '2.5 MB'
        },
        {
          id: 2,
          title: 'Договор с ПАО "Красноярскэнергосбыт"',
          extension: 'doc',
          url: '/documents/rso/energy-contract.doc',
          size: '1.8 MB'
        },
        {
          id: 3,
          title: 'Договор на вывоз ТБО',
          extension: 'pdf',
          url: '/documents/rso/garbage-contract.pdf',
          size: '3.1 MB'
        }
      ];
    } finally {
      this.setLoading(false);
    }
    return this.rsoDocuments;
  }

  async getTemplateDocuments() {
    this.setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.templateDocuments = [
        {
          id: 1,
          title: 'Заявление на перерасчет',
          extension: 'doc',
          url: '/documents/templates/recalculation.doc',
          size: '45 KB'
        },
        {
          id: 2,
          title: 'Бланк жалобы',
          extension: 'pdf',
          url: '/documents/templates/complaint.pdf',
          size: '67 KB'
        },
        {
          id: 3,
          title: 'Заявление на установку счетчика',
          extension: 'doc',
          url: '/documents/templates/meter-installation.doc',
          size: '52 KB'
        },
        {
          id: 4,
          title: 'Акт о заливе помещения',
          extension: 'doc',
          url: '/documents/templates/flood-act.doc',
          size: '61 KB'
        }
      ];
    } finally {
      this.setLoading(false);
    }
    return this.templateDocuments;
  }

  async getTermsContent() {
    this.setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.termsContent = {
        id: 1,
        content: `
          <h2>Общие положения</h2>
          <p>Настоящие правила определяют порядок оказания услуг управляющей компанией и регулируют отношения между собственниками помещений и управляющей организацией.</p>
          
          <h3>Основные термины</h3>
          <ul>
            <li>Собственник - лицо, владеющее на праве собственности помещением в многоквартирном доме</li>
            <li>Управляющая компания - организация, оказывающая услуги по управлению многоквартирным домом</li>
            <li>Общее имущество - имущество, принадлежащее собственникам помещений на праве общей долевой собственности</li>
          </ul>

          <h2>Права и обязанности сторон</h2>
          <h3>Управляющая компания обязуется:</h3>
          <ul>
            <li>Обеспечивать надлежащее содержание общего имущества</li>
            <li>Предоставлять коммунальные услуги надлежащего качества</li>
            <li>Осуществлять текущий ремонт общего имущества</li>
            <li>Вести учет доходов и расходов на содержание общего имущества</li>
          </ul>

          <h3>Собственники обязуются:</h3>
          <ul>
            <li>Своевременно оплачивать жилищно-коммунальные услуги</li>
            <li>Соблюдать правила пользования жилыми помещениями</li>
            <li>Обеспечивать доступ к инженерным коммуникациям</li>
            <li>Информировать УК о проведении работ по переустройству помещений</li>
          </ul>

          <h2>Ответственность сторон</h2>
          <p>Стороны несут ответственность за неисполнение или ненадлежащее исполнение обязательств в соответствии с действующим законодательством РФ и условиями договора управления многоквартирным домом.</p>
          <p>Управляющая компания несет ответственность за ущерб, причиненный имуществу собственников в многоквартирном доме, возникший в результате ее действий или бездействия, в порядке, установленном законодательством.</p>
        `
      };
    } finally {
      this.setLoading(false);
    }
    return this.termsContent;
  }
}

export const documentsStore = new DocumentsStore(); 