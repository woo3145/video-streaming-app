import { Button } from 'components/atoms/Button';
import {
  FieldLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/atoms/Select';
import { TextArea } from 'components/atoms/TextArea';
import { TextInput } from 'components/atoms/TextInput';
import {
  CLOUD_MAX_LENGTH,
  CLOUD_MIN_LENGTH,
  NICKNAME_MAX_LENGTH,
  NICKNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from 'constants/lengthLimits';
import { useCreateCloud } from 'hooks/apiHooks/useCreateCloud';

const CloudWriter = () => {
  const {
    inputs,
    handleSelectInput,
    handleInput,
    handleSubmit,
    handleValidation,
    isFormValid,
  } = useCreateCloud();

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
          minLength={CLOUD_MIN_LENGTH}
          maxLength={CLOUD_MAX_LENGTH}
          placeholder={`${CLOUD_MIN_LENGTH} - ${CLOUD_MAX_LENGTH}글자`}
          onChange={handleInput}
          value={inputs.content}
        />
        <div className="flex flex-col gap-2 w-full">
          <Select
            value={inputs.size}
            onChange={(value: string) => {
              handleSelectInput('size', value);
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
              handleSelectInput('speed', value);
            }}
          >
            <FieldLabel className="mb-1">속도 *</FieldLabel>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="구름이 지나가는 속도를 선택해주세요." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">느리게</SelectItem>
              <SelectItem value="medium">중간</SelectItem>
              <SelectItem value="fast">빠르게</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={inputs.height}
            onChange={(value: string) => {
              handleSelectInput('height', value);
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
        <p className="text-sm text-secondary-foreground/70">
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
