import { Button } from 'components/atoms/Button';
import { TextInput } from 'components/atoms/TextInput';
import { Modal } from './Modal';
import { useDeleteComment } from 'hooks/apiHooks/useDeleteComment';

interface Props {
  onRequestClose: () => void;
  commentId: string;
}

const DeleteCommentModal = ({ onRequestClose, commentId }: Props) => {
  const { inputs, isFormValid, handleInput, handleSubmit, handleValidation } =
    useDeleteComment(commentId);

  return (
    <Modal onRequestClose={onRequestClose}>
      <div className="w-[400px]">
        <h2 className="text-2xl font-bold">댓글 삭제</h2>
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
            min={0}
            max={100}
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

export default DeleteCommentModal;
