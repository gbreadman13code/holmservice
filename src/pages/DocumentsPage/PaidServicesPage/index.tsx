import { Container } from '@/components/Container';
import styles from './PaidServicesPage.module.scss';
import HeroSection from '@/components/HeroSection';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useState, useMemo } from 'react';

import servicesData from './services.json';

interface ServiceItem {
  name: string;
  unit: string;
  price: string;
  category?: string;
}

export const PaidServicesPage = () => {
  const [searchText, setSearchText] = useState('');

  const filteredServices = useMemo(() => {
    if (!searchText) return servicesData;

    const search = searchText.toLowerCase();
    return servicesData.filter(
      (service) => service.name.toLowerCase().includes(search) || service.category?.toLowerCase().includes(search),
    );
  }, [searchText]);

  const groupedServices = useMemo(() => {
    const groups: Record<string, ServiceItem[]> = {};
    filteredServices.forEach((service) => {
      const category = service.category || 'Прочие';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(service);
    });
    return groups;
  }, [filteredServices]);

  return (
    <div className={styles.page}>
      <HeroSection
        title="Платные услуги"
        subtitle="Прейскурант цен на отдельные виды услуг, выполняемых ООО УК «Холмсервис» за счет средств потребителей (без стоимости материалов)"
      />

      <section className={styles.content}>
        <Container>
          <div className={styles.services}>
            <div className={styles.searchWrapper}>
              <Input
                placeholder="Поиск услуги..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
                size="large"
              />
            </div>

            {Object.entries(groupedServices).map(([category, services]) => (
              <div key={category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{category}</h2>
                <div className={styles.tableWrapper}>
                  <table className={styles.servicesTable}>
                    <thead>
                      <tr>
                        <th>Наименование услуг</th>
                        <th>Ед-ца измер.</th>
                        <th>Стоимость услуг с НДС, руб.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {services.map((service, index) => (
                        <tr key={index}>
                          <td>{service.name}</td>
                          <td>{service.unit}</td>
                          <td>{service.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {filteredServices.length === 0 && (
              <div className={styles.emptyState}>
                <p>По вашему запросу ничего не найдено</p>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
};
