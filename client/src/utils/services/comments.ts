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
import bcrypt from 'bcryptjs';
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
    console.log('Firebase Error', e);
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
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const result = await addDoc(collection(db, 'comments'), {
      nickname,
      password: hashedPassword,
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

    return {
      success: true,
      newComment,
      message: '성공적으로 댓글을 생성했습니다.',
    };
  } catch (e) {
    console.log('Firebase Error', e);
    return { success: false, message: '예상치 못한 에러' };
  }
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
      return { success: false, message: '댓글이 존재하지 않습니다.' };
    }

    const commentData = commentSnapshot.data();
    console.log(commentData.password);
    const passwordMatch = await bcrypt.compare(password, commentData.password);
    if (!passwordMatch) {
      return { success: false, message: '비밀번호가 일치하지 않습니다.' };
    }

    await deleteDoc(commentRef);

    return { success: true, message: '성공적으로 댓글을 삭제했습니다.' };
  } catch (e) {
    console.log('Firebase Error', e);
    return { success: false, message: '예상치 못한 에러' };
  }
};
