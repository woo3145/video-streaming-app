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
import { createCloudQuery } from 'utils/firebaseHelper';
import { getRandomNumber } from 'utils/commonUtils';
import { handleFirebaseError } from 'utils/errorHandlers';

export interface SaveCloudInput {
  videoId: number;
  nickname: string;
  password: string;
  content: string;
  size: TCloudCommentSize;
  speed: TCloudCommentSpeed;
  height: TCloudCommentHeight;
  time: number;
}

/** Firebase DB와 상호작용하는 책임 */
class CloudRepository {
  async fetchOneWithPassword(
    cloudId: string
  ): Promise<ICloudCommentWithPassword | undefined> {
    try {
      const cloudRef = doc(db, 'clouds', cloudId);
      const cloudSnapshot = await getDoc(cloudRef);

      if (!cloudSnapshot.exists()) {
        return undefined;
      }

      const cloudData = cloudSnapshot.data();

      return {
        id: cloudSnapshot.id,
        ...cloudData,
      } as ICloudCommentWithPassword;
    } catch (e) {
      handleFirebaseError(e);
    }
  }

  async fetch(videoId: number): Promise<ICloudComment[] | undefined> {
    try {
      const q = createCloudQuery(videoId);
      const querySnapshot = await getDocs(q);

      const clouds: ICloudComment[] = querySnapshot.docs.map((doc) => {
        const { createdAt, ...rest } = doc.data();
        return {
          id: doc.id,
          createdAt: createdAt.toDate().toISOString(),
          ...rest,
        } as ICloudComment;
      });

      return clouds;
    } catch (e) {
      handleFirebaseError(e);
    }
  }

  async save(cloudInput: SaveCloudInput): Promise<ICloudComment | undefined> {
    const { videoId, nickname, password, content, size, speed, height, time } =
      cloudInput;

    try {
      const heights = {
        low: getRandomNumber(61, 90),
        medium: getRandomNumber(31, 60),
        high: getRandomNumber(0, 30),
      };

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await addDoc(collection(db, 'clouds'), {
        nickname,
        password: hashedPassword,
        content,
        createdAt: new Date(),
        videoId,
        displaySize: size,
        displayHeight: heights[height],
        displayTime: time,
        displaySpeed: speed,
      });

      const newCloud = {
        id: result.id,
        nickname,
        content,
        createdAt: new Date().toISOString(),
        videoId,
        displaySize: size,
        displayHeight: heights[height],
        displayTime: time,
        displaySpeed: speed,
      } as ICloudComment;

      return newCloud;
    } catch (e) {
      handleFirebaseError(e);
    }
  }

  async delete(cloudId: string): Promise<void> {
    try {
      const cloudRef = doc(db, 'clouds', cloudId);
      await deleteDoc(cloudRef);
    } catch (e) {
      handleFirebaseError(e);
    }
  }
}

export default CloudRepository;
