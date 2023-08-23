import { collection, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';

//** videoId를 가진 구름댓글 목록을 가져오는 쿼리를 생성함 */
export const createCloudQuery = (videoId: number) => {
  return query(
    collection(db, 'clouds'),
    where('videoId', '==', videoId),
    orderBy('createdAt', 'asc')
  );
};
