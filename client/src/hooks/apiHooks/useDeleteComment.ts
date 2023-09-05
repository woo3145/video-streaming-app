import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteComment } from 'services/commentService';
import { removeComment } from 'store/modules/commentsSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { handleErrorWithToast } from 'utils/errorHandlers';

interface CloudDeleteInput {
  password: string;
}

const initialInput = {
  password: '',
};

//** 댓글 삭제을 위한 커스텀 훅 */
export const useDeleteComment = (commentId: string) => {
  const dispatch = useAppDispatch();
  const { video } = useAppSelector((state) => state.video);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudDeleteInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!video) {
      toast.error('비디오가 존재하지 않습니다.');
      return;
    }
    const { password } = inputs;

    try {
      await deleteComment(commentId, password);

      dispatch(removeComment({ videoId: video.id, commentId }));
      toast.success('댓글이 삭제되었습니다.');
    } catch (e) {
      handleErrorWithToast(e);
    } finally {
      setInputs(initialInput);
      setIsFormValid(false);
    }
  };
  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    setIsFormValid(event.currentTarget.checkValidity());
  };
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  return { inputs, isFormValid, handleSubmit, handleInput, handleValidation };
};
