import { ChangeEvent, FormEvent, useState } from 'react';
import InputField from '../atoms/InputField';
import SubmitButton from '../atoms/SubmitButton';

const CommentWriter = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    content: '',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password, content } = inputs;
    console.log(username, password, content);
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
            name="username"
            label="닉네임"
            required
            minLength={2}
            maxLength={10}
            onChange={handleInput}
          />
          <InputField
            name="password"
            label="비밀번호"
            required
            type="password"
            minLength={5}
            maxLength={16}
            onChange={handleInput}
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
        />
        <SubmitButton isValid={isFormValid} text="댓글작성" />
      </form>
    </div>
  );
};

export default CommentWriter;
