import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

export const fetchClouds = async (
  videoTitle: string
): Promise<ICloudComment[] | null> => {
  try {
    const q = query(
      collection(db, 'clouds'),
      where('videoTitle', '==', videoTitle),
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
    console.log(e);
    return null;
  }
};

export const saveCloud = async ({
  videoTitle,
  nickname,
  password,
  content,

  size,
  speed,
  height,
  time,
}: {
  videoTitle: string;
  nickname: string;
  password: string;
  content: string;

  size: TCloudCommentSize;
  speed: TCloudCommentSpeed;
  height: TCloudCommentHeight;
  time: number;
}) => {
  //   if (!videoTitle) {
  //     throw new Error('VideoTitle is required');
  //   }
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
    videoTitle,
    displaySize: size,
    displayHeight: heights[height],
    displayTime: time,
    displaySpeed: speed,
  });

  const newComment = {
    id: result.id,
    nickname,
    content,
    createdAt: new Date().toISOString(),
    videoTitle,
    displaySize: size,
    displayHeight: heights[height],
    displayTime: time,
    displaySpeed: speed,
  } as ICloudComment;

  return newComment;
};
