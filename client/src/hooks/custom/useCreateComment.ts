import { ChangeEvent, FormEvent, useState } from 'react';
import { addComment } from 'store/modules/commentsSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { saveComment } from 'utils/services/comments';

interface CommentInput {
  nickname: string;
  password: string;
  content: string;
}

const initialInput: CommentInput = {
  nickname: '',
  password: '',
  content: '',
};

export const useCreateComment = () => {
  const dispatch = useAppDispatch();
  const videoId = useAppSelector((state) => state.video.id);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CommentInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nickname, password, content } = inputs;
    try {
      const newComment = await saveComment({
        videoId: videoId,
        nickname,
        password,
        content,
      });
      if (newComment) {
        dispatch(addComment(newComment));
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { handleSubmit, handleValidation, handleInput, inputs, isFormValid };
};
