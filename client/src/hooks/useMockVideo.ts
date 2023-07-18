import { mockVideos } from '../constants/mockVideos';

export const useMockVideo = (id?: string) => {
  const video = mockVideos.filter((video) => {
    return video.id === parseInt(id ? id : '0');
  });
  return { data: video.length === 0 ? null : video[0] };
};
