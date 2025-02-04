interface NavigationItem {
  path: string;
  label: string;
}

export const navigation: NavigationItem[] = [
  { path: '/my-home', label: 'Мой дом' },
  { path: '/news', label: 'Новости' },
  { path: '/documents', label: 'Документы' },
  { path: '/about', label: 'О нас' },
  { path: '/contacts', label: 'Контакты' },
]; 