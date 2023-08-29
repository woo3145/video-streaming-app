import { useEffect } from 'react';
import { fetchComments } from 'services/commentService';
import { setComments } from 'store/modules/commentsSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

/** Video의 댓글을 요청하고 redux에 저장하는 훅 */
const useFetchComments = (videoId: number | undefined) => {
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.comments);

  useEffect(() => {
    if (videoId === undefined || videoId === 0) return;

    const currentTime = Date.now();
    const fiveMinutesInMilliseconds = 5 * 60 * 1000;
    // 최근 댓글 요청시간에서 5분이 안지났다면 요청 X
    if (
      comments[videoId] &&
      currentTime - comments[videoId].lastFetched < fiveMinutesInMilliseconds
    )
      return;

    const fetch = async () => {
      console.log('댓글 요청');
      const videoComments = await fetchComments(videoId).catch((e) => {
        console.log('Failed to fetch Comments');
        return null;
      });

      if (videoComments) {
        dispatch(setComments({ videoId, comments: videoComments }));
      }
    };

    fetch();
  }, [dispatch, videoId, comments]);
};

export default useFetchComments;
