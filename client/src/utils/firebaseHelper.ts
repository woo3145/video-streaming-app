import { collection, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';

//** videoId를 가진 구름 목록을 가져오는 쿼리를 생성함 */
export const createCloudQuery = (videoId: number) => {
  return query(
    collection(db, 'clouds'),
    where('videoId', '==', videoId),
    orderBy('createdAt', 'asc')
  );
};

//** videoId를 가진 댓글 목록을 가져오는 쿼리를 생성함 */
export const createCommentQuery = (videoId: number) => {
  return query(
    collection(db, 'comments'),
    where('videoId', '==', videoId),
    orderBy('createdAt', 'asc')
  );
};
