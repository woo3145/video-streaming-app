import { ChangeEvent, FormEvent, useState } from 'react';
import InputField from '../atoms/InputField';
import SubmitButton from '../atoms/SubmitButton';
import SelectField from '../atoms/SelectField';
import { saveCloud } from '../../utils/services/clouds';
import { addCloud } from '../../store/modules/cloudSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface CloudInput {
  nickname: string;
  password: string;
  content: string;
  size: TCloudCommentSize;
  speed: TCloudCommentSpeed;
  height: TCloudCommentHeight;
}

const initialInput: CloudInput = {
  nickname: '',
  password: '',
  content: '',
  size: 'medium',
  speed: 'medium',
  height: 'medium',
};

const CloudWriter = () => {
  const dispatch = useAppDispatch();
  const currentTime = useAppSelector((state) => state.video.currentTime);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nickname, password, content, size, speed, height } = inputs;

    try {
      const newComment = await saveCloud({
        videoTitle: '',
        nickname,
        password,
        content,

        size,
        speed,
        height,
        time: currentTime,
      });
      if (newComment) {
        dispatch(addCloud(newComment));
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
          maxLength={30}
          onChange={handleInput}
          value={inputs.content}
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
            value={inputs.size}
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
            value={inputs.speed}
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
            value={inputs.height}
          />
        </div>
        <SubmitButton isValid={isFormValid} text="구름작성" />
      </form>
    </div>
  );
};

export default CloudWriter;
