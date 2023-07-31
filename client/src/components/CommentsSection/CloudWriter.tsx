import { ChangeEvent, FormEvent, useState } from 'react';
import InputField from '../atoms/InputField';
import SubmitButton from '../atoms/SubmitButton';
import SelectField from '../atoms/SelectField';

type TCloudSize = 'small' | 'medium' | 'large';
type TCloud = 'high' | 'medium' | 'low';

interface CloudInput {
  username: string;
  password: string;
  content: string;
  size: TCloudSize;
  speed: TCloudCommentSpeed;
  height: TCloud;
}

const CloudWriter = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudInput>({
    username: '',
    password: '',
    content: '',
    size: 'medium',
    speed: 'medium',
    height: 'medium',
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password, content, size, speed, height } = inputs;
    console.log(username, password, content, size, speed, height);
  };

  const handleValidation = (event: FormEvent<HTMLFormElement>) => {
    setIsFormValid(event.currentTarget.checkValidity());
  };

  const handleInput = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
          maxLength={30}
          onChange={handleInput}
        />
        <div className="flex flex-col gap-1 w-full">
          <SelectField
            name="size"
            placeholder="사이즈"
            options={[
              { value: 'small', label: '작게' },
              { value: 'medium', label: '중간' },
              { value: 'large', label: '크게' },
            ]}
            onChange={handleInput}
            defaultValue="medium"
          />
          <SelectField
            name="speed"
            placeholder="속도"
            options={[
              // { value: 'slow', label: '느리게' },
              { value: 'medium', label: '중간' },
              // { value: 'fast', label: '빠르게' },
            ]}
            onChange={handleInput}
            defaultValue="medium"
          />
          <SelectField
            name="height"
            placeholder="높이"
            options={[
              { value: 'high', label: '상 (0% ~ 30%)' },
              { value: 'medium', label: '중 (31% ~ 60%)' },
              { value: 'low', label: '하 (61% ~ 90%)' },
            ]}
            onChange={handleInput}
            defaultValue="medium"
          />
        </div>
        <SubmitButton isValid={isFormValid} text="구름작성" />
      </form>
    </div>
  );
};

export default CloudWriter;
