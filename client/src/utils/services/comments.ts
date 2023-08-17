import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
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

export const deleteComment = async ({
  commentId,
  password,
}: {
  commentId: string;
  password: string;
}) => {
  try {
    const commentRef = doc(db, 'comments', commentId);
    const commentSnapshot = await getDoc(commentRef);

    if (!commentSnapshot.exists()) {
      throw new Error('댓글이 존재하지 않습니다.');
    }

    const commentData = commentSnapshot.data();

    if (commentData.password !== password) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    await deleteDoc(commentRef);

    return { success: true };
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message };
    }
    return { success: false, message: '예상치 못한 에러' };
  }
};
