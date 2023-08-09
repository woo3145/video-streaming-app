import { ChangeEvent, FormEvent, useState } from 'react';
import InputField from '../atoms/InputField';
import { saveComment } from '../../utils/services/comments';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addComment } from '../../store/modules/commentsSlice';
import { Button } from '../atoms/Button';
import { TextInputField } from '../atoms/TextInputField';

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

const CommentWriter = () => {
  const dispatch = useAppDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CommentInput>(initialInput);
  const videoId = useAppSelector((state) => state.video.id);

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

  return (
    <div className="flex justify-between py-4 px-4 border-b">
      <form
        className="w-full space-y-4"
        onSubmit={handleSubmit}
        onInput={handleValidation}
      >
        <div className="w-full flex gap-4">
          <TextInputField
            name="nickname"
            label="닉네임 *"
            required
            minLength={2}
            maxLength={10}
            placeholder="2 - 10글자"
            onChange={handleInput}
            value={inputs.nickname}
          />
          <TextInputField
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
        <InputField
          name="content"
          label="내용"
          required
          type="textarea"
          minLength={0}
          maxLength={200}
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
