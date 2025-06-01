import { Typography, Select, Button, Spin, SelectProps } from 'antd';
import { observer } from 'mobx-react-lite';
import { Container } from '@/components/Container';
import { myHomeStore } from '@/stores/my-home/store';
import styles from './MyHomePage.module.scss';
import cityIllustration from '@/assets/illustrations/city-pattern.svg';
import HeroSection from '@/components/HeroSection';
import { HouseInfo } from './components/HouseInfo';
import { TariffsInfo } from './components/TariffsInfo';
import { ContactsInfo } from './components/ContactsInfo';

const { Text } = Typography;
const { Option } = Select;

const filterOption: SelectProps['filterOption'] = (input, option) => 
  (option?.label as string)?.toLowerCase().includes(input.toLowerCase());

const AddressSelector = observer(({ className }: { className?: string }) => {
  const handleStreetChange = (value: number) => {
    myHomeStore.setSelectedStreet(value);
  };

  const handleHouseChange = (value: number) => {
    myHomeStore.setSelectedHouse(value);
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
        disabled={myHomeStore.isLoading}
        value={myHomeStore.selectedStreetId}
        showSearch
        optionFilterProp="children"
        filterOption={filterOption}
      >
        {myHomeStore.streets?.map(street => (
          <Option key={street.STREET_ID} value={street.STREET_ID} label={`${street.STREET_TYPE_SHORT} ${street.STREET_NAME}`}>
            {`${street.STREET_TYPE_SHORT} ${street.STREET_NAME}`}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Выберите дом"
        className={styles.select}
        onChange={handleHouseChange}
        disabled={!myHomeStore.selectedStreetId || myHomeStore.isLoading || myHomeStore.isLoading}
        value={myHomeStore.selectedHouseId}
        showSearch
        optionFilterProp="children"
        filterOption={filterOption}
        notFoundContent={<div>На улице нет добавленных домов</div>}
      >
        {myHomeStore.houses.map(house => (
          <Option key={house.HOUSE_ID} value={house.HOUSE_ID} label={house.HNUMBER + (house.HLETTER || '')}>
            {house.HNUMBER + (house.HLETTER || '')}
          </Option>
        ))}
      </Select>

      <Button
        type="primary"
        onClick={handleSearch}
        disabled={!myHomeStore.selectedStreetId || !myHomeStore.selectedHouseId}
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

export const MyHomePage = observer(() => {
  if (myHomeStore.isLoading && myHomeStore.selectedStreetId && myHomeStore.selectedHouseId) {
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
              {myHomeStore.houseInfo.params && (
                <HouseInfo houseData={myHomeStore.houseInfo.params} dolg={myHomeStore.houseInfo.dolg} />
              )}
              {myHomeStore.houseInfo.tariffs.length > 0 && (
                <TariffsInfo tariffs={myHomeStore.houseInfo.tariffs} />
              )}
              <ContactsInfo contacts={myHomeStore.houseInfo.contacts} />
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