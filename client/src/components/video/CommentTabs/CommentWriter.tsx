import { Button } from 'components/atoms/Button';
import { TextArea } from 'components/atoms/TextArea';
import { TextInput } from 'components/atoms/TextInput';
import { useCreateComment } from 'hooks/apiHooks/useCreateComment';

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
            minLength={2}
            maxLength={10}
            placeholder="2 - 10글자"
            onChange={handleInput}
            value={inputs.nickname}
          />
          <TextInput
            type="password"
            name="password"
            label="비밀번호 *"
            required
            minLength={2}
            maxLength={16}
            placeholder="2 - 16글자"
            onChange={handleInput}
            value={inputs.password}
          />
        </div>
        <TextArea
          name="content"
          label="내용 *"
          required
          minLength={2}
          maxLength={20}
          placeholder="2 - 20글자"
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
