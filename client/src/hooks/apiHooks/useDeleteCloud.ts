import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteCloud } from 'services/cloudService';
import { removeCloud } from 'store/modules/cloudSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { handleErrorWithToast } from 'utils/errorHandlers';

interface CloudDeleteInput {
  password: string;
}

const initialInput = {
  password: '',
};

//** 구름댓글 삭제을 위한 커스텀 훅 */
export const useDeleteCloud = (cloudId: string) => {
  const dispatch = useAppDispatch();
  const { id: videoId } = useAppSelector((state) => state.video);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudDeleteInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password } = inputs;

    try {
      await deleteCloud(cloudId, password);

      dispatch(removeCloud({ videoId, cloudId }));
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
