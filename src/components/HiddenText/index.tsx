import { useState } from 'react';
import { Typography } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import styles from './HiddenText.module.scss';

interface HiddenTextProps {
  value: string | number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const HiddenText: React.FC<HiddenTextProps> = ({ 
  value, 
  prefix = '', 
  suffix = '',
  className 
}) => {
  const [isHidden, setIsHidden] = useState(true);

  const handleToggle = () => {
    setIsHidden(!isHidden);
  };

  const displayValue = isHidden ? '****' : value;

  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <Typography.Text strong>
        {prefix}{displayValue}{suffix}
      </Typography.Text>
      <button 
        className={styles.toggleButton}
        onClick={handleToggle}
        type="button"
        aria-label={isHidden ? 'Показать значение' : 'Скрыть значение'}
      >
        {isHidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </button>
    </div>
  );
}; 