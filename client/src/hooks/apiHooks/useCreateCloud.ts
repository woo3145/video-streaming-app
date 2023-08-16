import { ChangeEvent, FormEvent, useState } from 'react';
import { addCloud } from 'store/modules/cloudSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { saveCloud } from 'utils/services/clouds';

interface CloudInput {
  nickname: string;
  password: string;
  content: string;
  size: TCloudCommentSize | null;
  speed: TCloudCommentSpeed | null;
  height: TCloudCommentHeight | null;
}

const initialInput: CloudInput = {
  nickname: '',
  password: '',
  content: '',
  size: null,
  speed: null,
  height: null,
};

//** 구름댓글 생성을 위한 커스텀 훅 */
export const useCreateCloud = () => {
  const dispatch = useAppDispatch();
  const { id: videoId, currentTime } = useAppSelector((state) => state.video);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nickname, password, content, size, speed, height } = inputs;

    if (!(size && speed && height)) {
      window.alert('사이즈, 속도, 높이를 선택해주세요.');
      return;
    }

    try {
      const newComment = await saveCloud({
        videoId: videoId,
        nickname,
        password,
        content,
        size,
        speed,
        height,
        time: currentTime,
      });

      if (newComment) {
        newComment.isCreatedLocal = true;
        dispatch(addCloud(newComment));
        setInputs(initialInput);
        setIsFormValid(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    setIsFormValid(event.currentTarget.checkValidity());
  };

  const handleInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSelectInput = (name: keyof CloudInput, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  return {
    inputs,
    isFormValid,
    handleInput,
    handleSubmit,
    handleValidation,
    handleSelectInput,
  };
};
