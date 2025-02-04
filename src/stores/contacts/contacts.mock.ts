import { ContactsData } from './contacts.store';

export const contactsMock: ContactsData = {
  phones: [
    {
      id: 1,
      title: 'Аварийно-диспетчерская служба',
      type: 'phone',
      values: ['+7 (913) 123-45-67', '+7 (913) 123-45-89'],
      isCommon: true
    },
    {
      id: 2,
      title: 'Поверка счетчиков',
      type: 'phone',
      values: ['+7 (913) 123-45-68'],
      isCommon: false
    },
    {
      id: 3,
      title: 'Бухгалтерия',
      type: 'phone',
      values: ['+7 (913) 123-45-69'],
      isCommon: false
    }
  ],
  emails: [
    {
      id: 3,
      title: 'Общие вопросы',
      type: 'email',
      values: ['info@holmservice.ru'],
      isCommon: true
    },
    {
      id: 2,
      title: 'Техническая поддержка',
      type: 'email',
      values: ['support@holmservice.ru'],
      isCommon: false
    },
    {
      id: 3,
      title: 'Бухгалтерия',
      type: 'email',
      values: ['buh@holmservice.ru'],
      isCommon: false
    }
  ]
}; 