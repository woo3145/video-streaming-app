import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteComment } from 'services/comments';
import { removeComment } from 'store/modules/commentsSlice';
import { useAppDispatch } from 'store/store';

interface CloudDeleteInput {
  password: string;
}

const initialInput = {
  password: '',
};

//** 댓글 삭제을 위한 커스텀 훅 */
export const useDeleteComment = (commentId: string) => {
  const dispatch = useAppDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudDeleteInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password } = inputs;

    try {
      // 삭제
      const { success, message } = await deleteComment({
        commentId,
        password: password,
      });
      if (!success) {
        toast.error(message);
        throw new Error();
      }

      dispatch(removeComment(commentId));
      setInputs(initialInput);
      setIsFormValid(false);
      toast.success(message);
    } catch (e) {
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
