import { Card } from "antd";
import { Container } from "@/components/Container";
import {
  FileTextOutlined,
  FileProtectOutlined,
  BankOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "./DocumentsPage.module.scss";
import HeroSection from "@/components/HeroSection";

export const DocumentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <HeroSection
        title="Документы"
        subtitle="Нормативные документы, шаблоны и другая документация"
      />

      <section className={styles.content}>
        <Container>
          <div className={styles.grid}>
            <div className={styles.gridItem}>
              <Card
                className={styles.navCard}
                onClick={() => navigate("/documents/templates")}
                hoverable
              >
                <div className={styles.cardContent}>
                  <FileTextOutlined className={styles.icon} />
                  <div className={styles.info}>
                    <h3>Шаблоны документов</h3>
                    <p>Типовые формы заявлений и документов</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className={styles.gridItem}>
              <Card
                className={styles.navCard}
                onClick={() => navigate("/documents/terms")}
                hoverable
              >
                <div className={styles.cardContent}>
                  <FileProtectOutlined className={styles.icon} />
                  <div className={styles.info}>
                    <h3>Политика конфиденциальности</h3>
                    <p>Политика взаимодействия с пользователями сайта</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className={styles.gridItem}>
              <Card
                className={styles.navCard}
                onClick={() => navigate("/documents/details")}
                hoverable
              >
                <div className={styles.cardContent}>
                  <BankOutlined className={styles.icon} />
                  <div className={styles.info}>
                    <h3>Реквизиты компании</h3>
                    <p>Реквизиты управляющей компании Холмсервис</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className={styles.gridItem}>
              <Card
                className={styles.navCard}
                onClick={() => navigate("/paid-services")}
                hoverable
              >
                <div className={styles.cardContent}>
                  <DollarOutlined className={styles.icon} />
                  <div className={styles.info}>
                    <h3>Платные услуги</h3>
                    <p>Прейскурант цен на платные услуги компании</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
