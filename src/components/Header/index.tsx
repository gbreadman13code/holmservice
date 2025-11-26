import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { Container } from "@/components/Container";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Logo } from "../Logo";
import { Navigation } from "./components/Navigation";
import { UserMenu } from "./components/UserMenu";
import styles from "./Header.module.scss";
import { useState } from "react";
import { Socials } from "../Socials";

export const Header = observer(() => {
  // const { isAuth } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {/* Десктопная версия */}
      {!isMobile && (
        <header className={styles.header}>
          {/* <Container> */}
          <div className={styles.content}>
            <Logo />
            <div className={styles.desktopOnly}>
              <Navigation />
              <UserMenu />
              <Socials />
            </div>
          </div>
          {/* </Container> */}
        </header>
      )}

      {/* Мобильная версия */}
      {isMobile && (
        <header className={styles.mobileHeader}>
          <Container>
            <div className={styles.mobileContent}>
              <Logo />
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setIsMobileMenuOpen(true)}
                className={styles.menuButton}
              />
            </div>
          </Container>
        </header>
      )}

      {/* Мобильное меню */}
      <Drawer
        placement="right"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        width="100%"
        className={styles.mobileMenu}
        closable={false}
      >
        <div className={styles.mobileMenuHeader}>
          <Logo />
          <Button
            type="text"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.closeButton}
          >
            ✕
          </Button>
        </div>
        <div className={styles.mobileMenuContent}>
          <Navigation onItemClick={() => setIsMobileMenuOpen(false)} />
          <UserMenu isMobile onClose={() => setIsMobileMenuOpen(false)} />
        </div>
      </Drawer>
    </>
  );
});
