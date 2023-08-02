import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
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
