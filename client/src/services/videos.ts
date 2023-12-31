export const fetchVideos = async (): Promise<IVideo[]> => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_RESOURCE_URL}/videos.json`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      throw new Error('비디오목록 로드 중 에러가 발생했습니다.');
    }
    const data: IVideo[] = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
};
