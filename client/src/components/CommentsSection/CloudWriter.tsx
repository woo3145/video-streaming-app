import { ChangeEvent, FormEvent, useState } from 'react';
import InputField from '../atoms/InputField';
import SelectField from '../atoms/SelectField';
import { saveCloud } from '../../utils/services/clouds';
import { addCloud } from '../../store/modules/cloudSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { Button } from '../atoms/Button';
import { TextInputField } from '../atoms/TextInputField';

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
  const videoId = useAppSelector((state) => state.video.id);
  const [isFormValid, setIsFormValid] = useState(false);
  const [inputs, setInputs] = useState<CloudInput>(initialInput);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { nickname, password, content, size, speed, height } = inputs;

    try {
      const newComment = await saveCloud({
        videoId: videoId,
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
            name="password2"
            placeholder="5 - 16글자"
            label="비밀번호 *"
            minLength={5}
            maxLength={16}
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
            value={inputs.height}
          />
        </div>
        <Button variant="default" disabled={!isFormValid} size="lg" fullWidth>
          구름 작성
        </Button>
      </form>
    </div>
  );
};

export default CloudWriter;
