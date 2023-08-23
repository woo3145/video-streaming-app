import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { saveComment } from 'services/comments';
import { addComment } from 'store/modules/commentsSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

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

//** 댓글 생성을 위한 커스텀 훅 */
export const useCreateComment = () => {
  const dispatch = useAppDispatch();
  const videoId = useAppSelector((state) => state.video.id);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CommentInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nickname, password, content } = inputs;
    try {
      const { success, newComment, message } = await saveComment({
        videoId: videoId,
        nickname,
        password,
        content,
      });
      if (!success) {
        toast.error(message);
        throw new Error();
      }
      if (newComment) {
        newComment.isCreatedLocal = true;
        dispatch(addComment(newComment));
        setInputs(initialInput);
        setIsFormValid(false);
        toast.success(message);
      }
    } catch (e) {
      setInputs(initialInput);
      setIsFormValid(false);
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
