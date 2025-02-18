import { Typography, Select, Button, Spin, SelectProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { Container } from '@/components/Container';
import { ICompanyInfo, myHomeStore, ReportFile, WorkPlan } from '@/stores/my-home/store';
import styles from './MyHomePage.module.scss';
import { useEffect } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import cityIllustration from '@/assets/illustrations/city-pattern.svg';
import HeroSection from '@/components/HeroSection';

const { Title, Text } = Typography;
const { Option } = Select;

const filterOption: SelectProps['filterOption'] = (input, option) => 
  (option?.label as string)?.toLowerCase().includes(input.toLowerCase());

const AddressSelector = observer(({ className }: { className?: string }) => {
  const handleStreetChange = (value: number) => {
    const street = myHomeStore.streets.find(s => s.id === value) || null;
    myHomeStore.setSelectedStreet(street);
  };

  const handleHouseChange = (value: number) => {
    const house = myHomeStore.houses.find(h => h.id === value) || null;
    myHomeStore.setSelectedHouse(house);
  };

  const handleSearch = () => {
    myHomeStore.searchHouseInfo();
  };

  return (
    <div className={`${styles.form} ${className || ''}`}>
      <Select
        placeholder="Выберите улицу"
        className={styles.select}
        onChange={handleStreetChange}
        loading={myHomeStore.isLoading}
        value={myHomeStore.selectedStreet?.id}
        showSearch
        optionFilterProp="children"
        filterOption={filterOption}
      >
        {myHomeStore.streets.map(street => (
          <Option key={street.id} value={street.id} label={street.name}>
            {street.name}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Выберите дом"
        className={styles.select}
        onChange={handleHouseChange}
        disabled={!myHomeStore.selectedStreet || myHomeStore.isLoading}
        value={myHomeStore.selectedHouse?.id}
        showSearch
        optionFilterProp="children"
        filterOption={filterOption}
      >
        {myHomeStore.houses.map(house => (
          <Option key={house.id} value={house.id} label={house.number}>
            {house.number}
          </Option>
        ))}
      </Select>

      <Button
        type="primary"
        onClick={handleSearch}
        disabled={!myHomeStore.selectedStreet || !myHomeStore.selectedHouse}
        loading={myHomeStore.isLoading}
      >
        Найти
      </Button>
    </div>
  );
});

const LoadingInfo = () => (
  <div className={styles.loading}>
    <Spin size="large" />
    <Text>Ищем информацию</Text>
  </div>
);

const CompanyInfo = ({ info }: { info: ICompanyInfo }) => (
  <div className={styles.companyInfo}>
    <Title level={3}>Управляющая компания</Title>
    <div className={styles.infoContent}>
      <Text strong>{info.name}</Text>
      <Text>Адрес: {info.address}</Text>
      <Text>График работы: {info.schedule}</Text>
      <Text>Телефон: {info.phone}</Text>
      <Text>
        Сайт: <a href={info.website} target="_blank" rel="noopener noreferrer">{info.website}</a>
      </Text>
      <Text>
        Email: <a href={`mailto:${info.email}`}>{info.email}</a>
      </Text>
      <Text>Юридический адрес: {info.legalAddress}</Text>
      <Text>Юридический телефон: {info.legalPhone}</Text>
    </div>
  </div>
);

const Reports = ({ reports }: { reports: ReportFile[] }) => (
  <div className={styles.reports}>
    <Title level={3}>Отчетность</Title>
    <div className={styles.reportsList}>
      {reports.map(report => (
        <Button
          key={report.id}
          type="default"
          icon={<DownloadOutlined />}
          onClick={() => window.open(report.url, '_blank')}
        >
          {report.name}
        </Button>
      ))}
    </div>
  </div>
);

const WorkPlans = ({ plans }: { plans: WorkPlan[] }) => (
  <div className={styles.workPlans}>
    <Title level={3}>Планы работ</Title>
    <div className={styles.plansList}>
      {plans.map(plan => (
        <Button
          key={plan.id}
          type="default"
          icon={<DownloadOutlined />}
          onClick={() => window.open(plan.url, '_blank')}
        >
          {plan.name}
        </Button>
      ))}
    </div>
  </div>
);

export const MyHomePage = observer(() => {
  useEffect(() => {
    myHomeStore.loadStreets();
  }, []);

  if (myHomeStore.isLoading && myHomeStore.selectedStreet && myHomeStore.selectedHouse) {
    return (
      <div className={styles.page}>
        <HeroSection title="Мой дом" subtitle="Поиск информации о доме" />

        <section className={styles.content}>
          <Container>
            <AddressSelector className={styles.topSelector} />
            <LoadingInfo />
          </Container>
        </section>
      </div>
    );
  }

  if (myHomeStore.houseInfo) {
    return (
      <div className={styles.page}>
        <HeroSection title="Мой дом" subtitle="Информация о выбранном доме" />

        <section className={styles.content}>
          <Container>
            <AddressSelector className={styles.topSelector} />
            <div className={styles.houseInfo}>
              <CompanyInfo info={myHomeStore.houseInfo.companyInfo} />
              <Reports reports={myHomeStore.houseInfo.reports} />
              <WorkPlans plans={myHomeStore.houseInfo.workPlans} />
            </div>
          </Container>
        
        <div className={styles.cityBackground} style={{ backgroundImage: `url(${cityIllustration})` }} />
        </section>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <HeroSection title="Мой дом" subtitle="Выберите адрес вашего дома, чтобы узнать информацию о нем" />


      <section className={styles.content}>
        <Container>
          <AddressSelector />
        </Container>
      
        <div className={styles.cityBackground} style={{ backgroundImage: `url(${cityIllustration})` }} />
      </section>


    </div>
  );
}); 