import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from 'utils/firebase';
import bcrypt from 'bcryptjs';
import { createCommentQuery } from 'utils/firebaseHelper';
import { handleFirebaseError } from 'utils/errorHandlers';

export interface SaveCommentInput {
  videoId: number;
  nickname: string;
  password: string;
  content: string;
}

/** Firebase DB와 상호작용하는 책임 */
class CommentRepository {
  async fetchOneWithPassword(
    commentId: string
  ): Promise<ICommentWithPassword | undefined> {
    try {
      const commentRef = doc(db, 'comments', commentId);
      const commentSnapshot = await getDoc(commentRef);

      if (!commentSnapshot.exists()) {
        return undefined;
      }

      const commentData = commentSnapshot.data();

      return {
        id: commentSnapshot.id,
        ...commentData,
      } as ICommentWithPassword;
    } catch (e) {
      handleFirebaseError(e);
    }
  }

  async fetch(videoId: number): Promise<IComment[] | undefined> {
    try {
      const q = createCommentQuery(videoId);
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
      handleFirebaseError(e);
    }
  }

  async save(
    saveCommentInput: SaveCommentInput
  ): Promise<IComment | undefined> {
    const { videoId, nickname, password, content } = saveCommentInput;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
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

      return newComment;
    } catch (e) {
      handleFirebaseError(e);
    }
  }

  async delete(commentId: string): Promise<void> {
    try {
      const commentRef = doc(db, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (e) {
      handleFirebaseError(e);
    }
  }
}

export default CommentRepository;
