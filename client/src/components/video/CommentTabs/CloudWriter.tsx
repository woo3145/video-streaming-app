import { ChangeEvent, FormEvent, useState } from 'react';
import { saveCloud } from '../../../utils/services/clouds';
import { addCloud } from '../../../store/modules/cloudSlice';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Button } from '../../atoms/Button';
import { TextInput } from '../../atoms/TextInput';
import { TextArea } from '../../atoms/TextArea';
import {
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../atoms/Select';

interface CloudInput {
  nickname: string;
  password: string;
  content: string;
  size: TCloudCommentSize | null;
  speed: TCloudCommentSpeed | null;
  height: TCloudCommentHeight | null;
}

const initialInput: CloudInput = {
  nickname: '',
  password: '',
  content: '',
  size: null,
  speed: null,
  height: null,
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
    if (!size) {
      window.alert('사이즈를 선택해주세요.');
      return;
    }
    if (!speed) {
      window.alert('속도를 선택해주세요.');
      return;
    }
    if (!height) {
      window.alert('높이를 선택해주세요.');
      return;
    }
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
        <div className="flex flex-col gap-2 w-full">
          <Select
            value={inputs.size}
            onChange={(value: string) => {
              setInputs({ ...inputs, size: value as TCloudCommentSize });
            }}
          >
            <FieldLabel className="mb-1">크기 *</FieldLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="구름이 표시될 크기를 선택해주세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">작게</SelectItem>
              <SelectItem value="medium">중간</SelectItem>
              <SelectItem value="large">크게</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={inputs.speed}
            onChange={(value: string) => {
              setInputs({ ...inputs, speed: value as TCloudCommentSpeed });
            }}
          >
            <FieldLabel className="mb-1">속도 *</FieldLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="구름이 지나가는 속도를 선택해주세요." />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectItem value="slow">느리게</SelectItem> */}
              <SelectItem value="medium">중간</SelectItem>
              {/* <SelectItem value="fast">빠르게</SelectItem> */}
            </SelectContent>
          </Select>

          <Select
            value={inputs.height}
            onChange={(value: string) => {
              setInputs({ ...inputs, height: value as TCloudCommentHeight });
            }}
          >
            <FieldLabel className="mb-1">높이 *</FieldLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="구름이 생성 될 높이를 선택해주세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">상 (0% ~ 30%)</SelectItem>
              <SelectItem value="medium">중 (31% ~ 60%)</SelectItem>
              <SelectItem value="low">하 (61% ~ 90%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-secondary-foreground/50">
          현재 영상시점에 구름이 생성됩니다.
        </p>
        <Button variant="default" disabled={!isFormValid} size="lg" fullWidth>
          구름 작성
        </Button>
      </form>
    </div>
  );
};

export default CloudWriter;
