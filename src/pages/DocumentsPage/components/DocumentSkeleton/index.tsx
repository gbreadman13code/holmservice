import { Card, Skeleton } from 'antd';
import styles from './DocumentSkeleton.module.scss';

export const DocumentSkeleton = () => {
  return (
    <Card className={styles.skeleton}>
      <div className={styles.icon}>
        <Skeleton.Avatar size={32} shape="square" />
      </div>
      <div className={styles.info}>
        <Skeleton.Input style={{ width: '100%' }} size="small" />
        <Skeleton.Input style={{ width: '30%' }} size="small" />
      </div>
    </Card>
  );
}; 