export const fetchVideos = async (): Promise<IVideo[]> => {
  try {
    const res = await fetch('http://localhost:4000/videos');
    if (!res.ok) {
      throw new Error('비디오목록 로드 중 에러가 발생했습니다.');
    }
    const data: IVideo[] = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
};
