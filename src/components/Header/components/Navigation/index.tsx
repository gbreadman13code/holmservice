import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { navigation } from '../../../../router/navigation';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const { pathname } = useLocation();

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
            key: '/documents/rso',
            label: <Link to="/documents/rso">Договоры с РСО</Link>
          },
          {
            key: '/documents/templates',
            label: <Link to="/documents/templates">Шаблоны документов</Link>
          },
          {
            key: '/documents/terms',
            label: <Link to="/documents/terms">Условия и соглашения</Link>
          }
        ]
      };
    }
    return {
      key: item.path,
      label: <Link to={item.path}>{item.label}</Link>
    };
  });

  return (
    <div className={styles.wrapper}>

        <Menu 
          mode="horizontal" 
          selectedKeys={[pathname]} 
          className={styles.menu}
          items={items}
        />

    </div>
  );
};

export { Navigation }; 