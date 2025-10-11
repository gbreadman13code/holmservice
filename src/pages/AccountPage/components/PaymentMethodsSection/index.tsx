import { Typography } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import styles from './PaymentMethodsSection.module.scss';

const { Title, Paragraph, Link } = Typography;

export const PaymentMethodsSection = () => {
  return (
    <div className={styles.container}>
      <Title level={2}>Оплатить жилищно-коммунальные услуги можно следующими способами:</Title>
      
      <div className={styles.paymentList}>
        <Paragraph className={styles.paymentItem}>
          в кассе управляющей компании по адресу ул.Водопьянова д.19 оф.121 (без комиссии).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          безналичным платежом через банк по{' '}
          <RouterLink to="/documents/details">
            реквизитам
          </RouterLink>{' '}
          компании (в назначении платежа обязательно указывайте ФЛС).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          по QR-коду отраженному на квитанции (комиссия зависит от банка собственника, возможно без комиссии).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          через мобильное приложение УК "Холмсервис" (с комиссией){' '}
          <Link 
            href="https://apps.apple.com/ru/app/%D1%83%D0%BA-%D1%85%D0%BE%D0%BB%D0%BC%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81/id1506237113" 
            target="_blank"
          >
            IOS
          </Link>{' '}
          и{' '}
          <Link 
            href="https://play.google.com/store/apps/details?id=ru.krasabs.holmservice" 
            target="_blank"
          >
            Android
          </Link>.
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          терминалы "Платежка" наличными и картой (
          <Link href="https://holmservis.ru/platezhka.php" target="_blank">
            Список терминалов с оплатой без комиссии
          </Link>
          )
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          на сайте{' '}
          <Link href="https://platezhka.com/" target="_blank">
            "Платежка"
          </Link>{' '}
          в разделе "Коммунальные платежи" (картами Visa, MasterCard, МИР) ЖКУ,{' '}
          <RouterLink to="/documents/details">
            Капитальный ремонт
          </RouterLink>{' '}
          (без комиссии).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          через{' '}
          <Link 
            href="https://play.google.com/store/apps/details?id=ru.krasabs.oplat&hl=ru&gl=US" 
            target="_blank"
          >
            Мобильное приложение "Платежка online"
          </Link>{' '}
          (без комиссии).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          терминалы самообслуживания Сбербанка (с комиссией банка).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          через интернет клиент{' '}
          <Link href="https://online.sberbank.ru/CSAFront/index.do" target="_blank">
            Сбербанк Онлайн
          </Link>{' '}
          (с комиссией банка). Перейдите по ссылке: ЖКУ,{' '}
          <RouterLink to="/documents/details">
            Капитальный ремонт
          </RouterLink>
          . Введите лицевой счет и, следуя подсказкам системы, проведите оплату.
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          наличными и по карте во всех отделениях ООО «Телекомсервис» через оператора (ЖКУ без комиссии, КАПРЕМОНТ с комиссией 1%).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          по карте в системе{' '}
          <Link href="http://online.vtb.ru/i/pay" target="_blank">
            ВТБ онлайн
          </Link>{' '}
          и через мобильное приложение банка ВТБ (ЖКУ и КАПРЕМОНТ без комиссии).
        </Paragraph>

        <Paragraph className={styles.paymentItem}>
          наличными во всех отделениях Почта России через оператора (без комиссии).
        </Paragraph>
      </div>
    </div>
  );
};

