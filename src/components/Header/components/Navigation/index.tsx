import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { navigation } from '../../../../router/navigation';
import { useIsMobile } from '@/hooks/useIsMobile';
import styles from './Navigation.module.scss';

interface NavigationProps {
  onItemClick?: () => void;
}

export const Navigation = ({ onItemClick }: NavigationProps) => {
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  console.log(pathname);

  const items = navigation.map((item) => {
    if (item.path === '/documents') {
      return {
        key: item.path,
        label: (
          <>
            {item.label} <DownOutlined className={styles.arrow} />
          </>
        ),
        children: [
          {
            key: '/documents/templates',
            label: <Link to="/documents/templates" onClick={onItemClick}>Шаблоны документов</Link>
          },
          {
            key: '/documents/terms',
            label: <Link to="/documents/terms" onClick={onItemClick}>Условия и соглашения</Link>
          },
          {
            key: '/documents/details',
            label: <Link to="/documents/details" onClick={onItemClick}>Реквизиты компании</Link>
          },
          {
            key: '/documents/paid-services',
            label: <Link to="/documents/paid-services" onClick={onItemClick}>Платные услуги</Link>
          }
        ]
      };
    }
    return {
      key: item.path,
      label: <Link to={item.path} onClick={onItemClick}>{item.label}</Link>
    };
  });

  return (
    <div className={styles.wrapper}>
      {isMobile ? <Menu 
        mode={"inline"}
        selectedKeys={[pathname]}
        className={`${styles.menu} ${isMobile ? styles.mobileMenu : ''}`}
        items={items}
        triggerSubMenuAction={'click'}
      /> : <Menu 
      mode={"horizontal"}
      selectedKeys={[pathname]}
      className={`${styles.menu} ${isMobile ? styles.mobileMenu : ''}`}
      items={items}
    />}

    </div>
  );
}; 