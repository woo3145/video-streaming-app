import { Button } from 'components/atoms/Button';
import { TextInput } from 'components/atoms/TextInput';
import { useDeleteCloud } from 'hooks/apiHooks/useDeleteCloud';
import { Modal } from './Modal';

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  cloudId: string;
}

const DeleteCloudModal = ({ isOpen, onRequestClose, cloudId }: Props) => {
  const { inputs, isFormValid, handleInput, handleSubmit, handleValidation } =
    useDeleteCloud(cloudId);

  return (
    <Modal onRequestClose={onRequestClose}>
      <div className="w-[400px]">
        <h2 className="text-2xl font-bold">구름 삭제</h2>
        <form
          onChange={handleValidation}
          className="pt-4"
          onSubmit={handleSubmit}
        >
          <TextInput
            type="password"
            name="password"
            value={inputs.password}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            required
            minLength={2}
            maxLength={100}
            onChange={handleInput}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="destructive"
              disabled={!isFormValid}
              className="mt-4"
              fullWidth
            >
              확인
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="mt-4"
              fullWidth
              onClick={onRequestClose}
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default DeleteCloudModal;
