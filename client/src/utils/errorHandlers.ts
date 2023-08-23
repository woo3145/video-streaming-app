import { CustomError, UnexpectedError } from 'errors/CustomError';
import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

/** Error를 Firebase 에러와 Unexpected 에러를 나눠서 에러를 throw 해줌 */
export const handleFirebaseError = (e: unknown) => {
  if (e instanceof FirebaseError) {
    console.log('Firebase Error: ', e);
    throw new CustomError('DB에 문제가 발생했습니다.');
  } else if (e instanceof Error) {
    console.log('Unexpected Error: ', e);
    throw new UnexpectedError();
  }
};

/** 클라이언트에서 Custom 에러 또는 Unexpected 에러라면 toast를 생성함  */
export const handleErrorWithToast = (e: unknown) => {
  if (e instanceof CustomError) {
    toast.error(e.message);
  } else if (e instanceof UnexpectedError) {
    toast.error(e.message);
  }
};
