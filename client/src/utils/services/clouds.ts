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

export const fetchClouds = async (
  videoId: number
): Promise<ICloudComment[] | null> => {
  try {
    const q = query(
      collection(db, 'clouds'),
      where('videoId', '==', videoId),
      orderBy('createdAt', 'asc')
    );
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
    console.log('Firebase Error', e);
    return null;
  }
};

export const saveCloud = async ({
  videoId,
  nickname,
  password,
  content,

  size,
  speed,
  height,
  time,
}: {
  videoId: number;
  nickname: string;
  password: string;
  content: string;

  size: TCloudCommentSize;
  speed: TCloudCommentSpeed;
  height: TCloudCommentHeight;
  time: number;
}) => {
  try {
    const randomHeight = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const heights = {
      low: randomHeight(61, 90),
      medium: randomHeight(31, 60),
      high: randomHeight(0, 30),
    };

    const result = await addDoc(collection(db, 'clouds'), {
      nickname,
      password,
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

    return {
      success: true,
      newCloud,
      message: '성공적으로 구름을 생성했습니다.',
    };
  } catch (e) {
    console.log('Firebase Error', e);
    return { success: false, message: '예상치 못한 에러' };
  }
};

export const deleteCloud = async ({
  cloudId,
  password,
}: {
  cloudId: string;
  password: string;
}) => {
  try {
    const cloudRef = doc(db, 'clouds', cloudId);
    const cloudSnapshot = await getDoc(cloudRef);

    if (!cloudSnapshot.exists()) {
      return { success: false, message: '구름이 존재하지 않습니다.' };
    }

    const cloudData = cloudSnapshot.data();

    if (cloudData.password !== password) {
      return { success: false, message: '비밀번호가 일치하지 않습니다.' };
    }

    await deleteDoc(cloudRef);

    return { success: true, message: '성공적으로 구름을 삭제했습니다.' };
  } catch (e) {
    console.log('Firebase Error', e);
    return { success: false, message: '예상치 못한 에러' };
  }
};
