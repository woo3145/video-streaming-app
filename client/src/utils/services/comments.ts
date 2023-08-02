import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchComments = async (
  videoTitle: string
): Promise<IComment[] | null> => {
  try {
    const q = query(
      collection(db, 'comments'),
      where('videoTitle', '==', videoTitle),
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
