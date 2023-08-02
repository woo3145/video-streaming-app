import { ChangeEvent, FormEvent, useState } from 'react';
import InputField from '../atoms/InputField';
import SubmitButton from '../atoms/SubmitButton';
import { saveComment } from '../../utils/services/comments';
import { useAppDispatch } from '../../store/store';
import { addComment } from '../../store/modules/commentsSlice';

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nickname, password, content } = inputs;
    try {
      const newComment = await saveComment({
        videoTitle: '',
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
          <InputField
            name="nickname"
            label="닉네임"
            required
            minLength={2}
            maxLength={10}
            onChange={handleInput}
            value={inputs.nickname}
          />
          <InputField
            name="password"
            label="비밀번호"
            required
            type="password"
            minLength={5}
            maxLength={16}
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
        <SubmitButton isValid={isFormValid} text="댓글작성" />
      </form>
    </div>
  );
};

export default CommentWriter;
