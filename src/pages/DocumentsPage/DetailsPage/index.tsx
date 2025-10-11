import { Container } from '@/components/Container';
import styles from './DetailsPage.module.scss';
import HeroSection from '@/components/HeroSection';

export const DetailsPage = () => {
  return (
    <div className={styles.page}>
      <HeroSection title="Реквизиты управляющей компании Холмсервис" subtitle="" />

      <section className={styles.content}>
        <Container>
          <div className={styles.details}>
            <table className={styles.detailsTable}>
              <tbody>
                <tr>
                  <td className={styles.label}>Полное наименование</td>
                  <td className={styles.value}>Общество с ограниченной ответственностью "Управляющая компания "Холмсервис"</td>
                </tr>
                <tr>
                  <td className={styles.label}>Сокращенное наименование</td>
                  <td className={styles.value}>ООО "УК "Холмсервис"</td>
                </tr>
                <tr>
                  <td className={styles.label}>Генеральный директор</td>
                  <td className={styles.value}>Сидорова Ирина Ивановна</td>
                </tr>
                <tr>
                  <td className={styles.label}>Юридический адрес</td>
                  <td className={styles.value}>660098, Россия, Красноярский край, г.Красноярск, ул.Водопьянова, д.19 офис 121</td>
                </tr>
                <tr>
                  <td className={styles.label}>Фактический адрес</td>
                  <td className={styles.value}>660098, Россия, Красноярский край, г.Красноярск, ул.Водопьянова, д.19 офис 121</td>
                </tr>
                <tr>
                  <td className={styles.label}>Телефон</td>
                  <td className={styles.value}>+7 (391) 989-85-85</td>
                </tr>
                <tr>
                  <td className={styles.label}>Адрес электронной почты</td>
                  <td className={styles.value}>info@holmservis.ru</td>
                </tr>
                <tr>
                  <td className={styles.label}>Государственная регистрация</td>
                  <td className={styles.value}>Свидетельство о регистрации выдано Инспекцией Федеральной налоговой службы по Советскому району г.Красноярска 05 декабря 2005 года. ОГРН 1052465164784</td>
                </tr>
                <tr>
                  <td className={styles.label}>ИНН/КПП</td>
                  <td className={styles.value}>2465095908/246501001</td>
                </tr>
                <tr>
                  <td className={styles.label}>Расчетный счет</td>
                  <td className={styles.value}>40702810731280131045</td>
                </tr>
                <tr>
                  <td className={styles.label}>Корреспондентский счёт</td>
                  <td className={styles.value}>30101810800000000627</td>
                </tr>
                <tr>
                  <td className={styles.label}>Наименование банка</td>
                  <td className={styles.value}>Красноярское отделение №8646 ПАО Сбербанк</td>
                </tr>
                <tr>
                  <td className={styles.label}>БИК</td>
                  <td className={styles.value}>040407627</td>
                </tr>
                <tr>
                  <td className={styles.label}>Членство в объединениях управляющих организаций</td>
                  <td className={styles.value}>Некоммерческая организация "Ассоциация управляющих компаний Красноярского края". Адрес местонахождения: 660049, г.Красноярск, пр.Мира д.52 корп."А"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>
    </div>
  );
};


