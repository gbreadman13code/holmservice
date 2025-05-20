import { FC, CSSProperties } from 'react';
import styles from './HtmlContent.module.scss';

interface HtmlContentProps {
  content: string;
  className?: string;
  maxLines?: number;
  hideUrls?: boolean;
}

const cleanHtmlContent = (html: string) => {
  return html
    .replace(/>\s+</g, '><') // Удаляем пробелы между тегами
    .replace(/\n/g, ''); // Удаляем все переносы строк
};

const removeUrls = (html: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Находим все ссылки
  const links = tempDiv.getElementsByTagName('a');
  
  // Заменяем каждую ссылку её текстовым содержимым
  while (links.length) {
    const link = links[0];
    const text = link.textContent || '';
    const textNode = document.createTextNode(text);
    link.parentNode?.replaceChild(textNode, link);
  }
  
  return tempDiv.innerHTML;
};

export const HtmlContent: FC<HtmlContentProps> = ({ 
  content, 
  className, 
  maxLines,
  hideUrls = false 
}) => {
  const contentStyle: CSSProperties = maxLines ? { 
    WebkitLineClamp: maxLines,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  } : {};

  const processedContent = hideUrls 
    ? removeUrls(cleanHtmlContent(content))
    : cleanHtmlContent(content);

  return (
    <div 
      className={`${styles.content} ${className || ''}`}
      style={contentStyle}
      dangerouslySetInnerHTML={{ __html: processedContent }} 
    />
  );
}; 