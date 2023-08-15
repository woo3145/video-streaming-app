import { useEffect } from 'react';
import { setComments } from 'store/modules/commentsSlice';
import { useAppDispatch } from 'store/store';
import { fetchComments } from 'utils/services/comments';

/** Video의 댓글을 요청하고 redux에 저장하는 훅 */
const useFetchComments = (videoId: number | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoId === undefined || videoId === 0) return;

    const fetch = async () => {
      const videoComments = await fetchComments(videoId).catch((e) => {
        console.log('Failed to fetch Comments');
        return null;
      });

      if (videoComments) {
        dispatch(setComments(videoComments));
      }
    };

    fetch();
  }, [dispatch, videoId]);
};

export default useFetchComments;