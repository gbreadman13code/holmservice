import { NewsItem } from './types';

export const mapNewsItem = (item: NewsItem): NewsItem => {
  const newItem = { ...item };

  if (newItem.vk_video_link) {
    const match = newItem.vk_video_link.match(/(?:clip|video)(-?\d+)_(\d+)/);
    if (match) {
      const [, oid, id] = match;
      newItem.vk_video_link = `https://vk.com/video_ext.php?oid=${oid}&id=${id}&autoplay=1`;
    }
  }

  return newItem;
};
