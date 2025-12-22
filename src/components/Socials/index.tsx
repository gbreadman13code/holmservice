import { TelegramIcon, VkIcon } from "@/components/Icons";
import styles from "./Socials.module.scss";
import { MaxIcon } from "../Icons/MaxIcon";

export const Socials = () => {
  const socialLinks = [
    {
      icon: (
        <TelegramIcon width={32} height={32} color="var(--primary-color)" />
      ),
      href: "https://t.me/holmservis/",
      label: "Telegram",
    },
    {
      icon: <VkIcon width={32} height={32} color="var(--primary-color)" />,
      href: "https://vk.com/holmservis",
      label: "Вконтакте",
    },
    {
      icon: <MaxIcon width={32} height={32} color="var(--primary-color)" />,
      href: "https://max.ru/id2465095908_biz",
      label: "Max",
    },
  ];

  return (
    <div className={styles.social}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};
