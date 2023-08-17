import { ChangeEvent, FormEvent, useState } from 'react';
import { removeCloud } from 'store/modules/cloudSlice';
import { useAppDispatch } from 'store/store';
import { deleteCloud } from 'utils/services/clouds';

interface CloudDeleteInput {
  password: string;
}

const initialInput = {
  password: '',
};

//** 구름댓글 삭제을 위한 커스텀 훅 */
export const useDeleteCloud = (cloudId: string) => {
  const dispatch = useAppDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudDeleteInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password } = inputs;

    try {
      // 삭제
      const { success, message } = await deleteCloud({
        cloudId,
        password: password,
      });
      if (!success) throw new Error(message);

      dispatch(removeCloud(cloudId));
      setInputs(initialInput);
      setIsFormValid(false);
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
