import styles from "./SocialsSection.module.scss";
import { Typography } from "antd";
import { Container } from "@/components/Container";
import tgScreen from "@/assets/illustrations/tg_screen.png";
import vkScreen from "@/assets/illustrations/vk_screen.png";
import maxScreen from "@/assets/illustrations/max_screen.png";

const { Title, Paragraph } = Typography;

export const SocialsSection = () => {
  const handleTelegramClick = () => {
    window.open("https://t.me/holmservis/", "_blank");
  };

  const handleVkClick = () => {
    window.open("https://vk.com/holmservis", "_blank");
  };

  const handleMaxClick = () => {
    window.open("https://max.ru/id2465095908_biz", "_blank");
  };

  return (
    <section className={styles.promo}>
      <Container>
        <div className={styles.content}>
          <div className={styles.imagesWrapper}>
            <div className={styles.image}>
              <img
                src={tgScreen}
                alt="Telegram"
                onClick={handleTelegramClick}
              />
            </div>

            <div className={styles.image}>
              <img src={vkScreen} alt="Вконтакте" onClick={handleVkClick} />
            </div>

            <div className={styles.image}>
              <img src={maxScreen} alt="MAX" onClick={handleMaxClick} />
            </div>
          </div>

          <div className={styles.info}>
            <Title level={2} className={styles.title}>
              Присоединяйтесь к нам в&nbsp;социальных сетях
            </Title>
            <Paragraph className={styles.description}>
              Следите за новостями и обновлениями наших сервисов, общайтесь
              и&nbsp;получайте полезную информацию прямо в любимых социальных
              сетях и&nbsp;мессенджерах.
            </Paragraph>
          </div>
        </div>
      </Container>
    </section>
  );
};
