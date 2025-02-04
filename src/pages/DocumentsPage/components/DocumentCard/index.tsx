import { Card } from 'antd';
import { FilePdfOutlined, FileWordOutlined } from '@ant-design/icons';
import { Document } from '@/stores/documents';
import styles from './DocumentCard.module.scss';

interface DocumentCardProps {
  document: Document;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const handleDownload = () => {
    window.open(document.url, '_blank');
  };

  const getIcon = () => {
    switch (document.extension) {
      case 'pdf':
        return <FilePdfOutlined className={styles.pdfIcon} />;
      case 'doc':
      case 'docx':
        return <FileWordOutlined className={styles.wordIcon} />;
      default:
        return null;
    }
  };

  return (
    <Card className={styles.card} onClick={handleDownload}>
      <div className={styles.icon}>{getIcon()}</div>
      <div className={styles.info}>
        <div className={styles.title}>{document.title}</div>
        <div className={styles.size}>{document.size}</div>
      </div>
    </Card>
  );
}; 