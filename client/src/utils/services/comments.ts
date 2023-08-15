import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'utils/firebase';

export const fetchComments = async (
  videoId: number
): Promise<IComment[] | null> => {
  try {
    const q = query(
      collection(db, 'comments'),
      where('videoId', '==', videoId),
      orderBy('createdAt', 'asc')
    );
    const querySnapshot = await getDocs(q);

    const comments: IComment[] = querySnapshot.docs.map((doc) => {
      const { createdAt, ...rest } = doc.data();
      return {
        id: doc.id,
        createdAt: createdAt.toDate().toISOString(),
        ...rest,
      } as IComment;
    });

    return comments;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const saveComment = async ({
  videoId,
  nickname,
  password,
  content,
}: {
  videoId: number;
  nickname: string;
  password: string;
  content: string;
}) => {
  //   if (!videoTitle) {
  //     throw new Error('VideoTitle is required');
  //   }

  const result = await addDoc(collection(db, 'comments'), {
    nickname,
    password,
    content,
    createdAt: new Date(),
    videoId,
  });

  const newComment = {
    id: result.id,
    nickname,
    content,
    createdAt: new Date().toISOString(),
    videoId,
  } as IComment;

  return newComment;
};
