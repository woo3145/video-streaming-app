import { Button } from 'components/atoms/Button';
import { TextArea } from 'components/atoms/TextArea';
import { TextInput } from 'components/atoms/TextInput';
import { useCreateComment } from 'hooks/apiHooks/useCreateComment';
import {
  COMMENT_MAX_LENGTH,
  COMMENT_MIN_LENGTH,
  NICKNAME_MAX_LENGTH,
  NICKNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from 'constants/lengthLimits';

const CommentWriter = () => {
  const { handleInput, handleSubmit, handleValidation, isFormValid, inputs } =
    useCreateComment();

  return (
    <div className="flex justify-between py-4 px-4 border-b">
      <form
        className="w-full space-y-4"
        onSubmit={handleSubmit}
        onInput={handleValidation}
      >
        <div className="w-full flex gap-4">
          <TextInput
            name="nickname"
            label="닉네임 *"
            required
            minLength={NICKNAME_MIN_LENGTH}
            maxLength={NICKNAME_MAX_LENGTH}
            placeholder={`${NICKNAME_MIN_LENGTH} - ${NICKNAME_MAX_LENGTH}글자`}
            onChange={handleInput}
            value={inputs.nickname}
          />
          <TextInput
            type="password"
            name="password"
            label="비밀번호 *"
            required
            minLength={PASSWORD_MIN_LENGTH}
            maxLength={PASSWORD_MAX_LENGTH}
            placeholder={`${PASSWORD_MIN_LENGTH} - ${PASSWORD_MAX_LENGTH}글자`}
            onChange={handleInput}
            value={inputs.password}
          />
        </div>
        <TextArea
          name="content"
          label="내용 *"
          required
          minLength={COMMENT_MIN_LENGTH}
          maxLength={COMMENT_MAX_LENGTH}
          placeholder={`${COMMENT_MIN_LENGTH} - ${COMMENT_MAX_LENGTH}글자`}
          onChange={handleInput}
          value={inputs.content}
        />
        <Button variant="default" disabled={!isFormValid} size="lg" fullWidth>
          댓글 작성
        </Button>
      </form>
    </div>
  );
};

export default CommentWriter;
