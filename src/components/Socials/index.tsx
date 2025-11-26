import { TelegramIcon, VkIcon } from "@/components/Icons";
import styles from "./Socials.module.scss";

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
