import { Card } from 'antd';
import { FileOutlined, FilePdfOutlined, FileWordOutlined, FileImageOutlined, FileExcelOutlined } from '@ant-design/icons';
import styles from './DocumentCard.module.scss';
import { Document } from '@/stores/documents/types';
interface DocumentCardProps {
  document: Document;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.filepath;
    link.download = document.filepath.split('/').pop() || 'document'; 
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const getIcon = () => {
    switch (document.extension) {
      case 'pdf':
        return <FilePdfOutlined className={styles.pdfIcon} />;
      case 'doc':
        return <FileWordOutlined className={styles.wordIcon} />;
      case 'image':
        return <FileImageOutlined className={styles.imageIcon} />;
      case 'table':
        return <FileExcelOutlined className={styles.excelIcon} />;
      default:
        return <FileOutlined className={styles.anyIcon} />;
    }
  };

  return (
    <Card className={styles.card} onClick={handleDownload}>
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.info}>
        <div className={styles.title}>{document.filename}</div>
        <div className={styles.size}>28 MB</div>
      </div>
    </Card>
  );
}; 