import {
  NICKNAME_MAX_LENGTH,
  NICKNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from 'constants/lengthLimits';
import { ValidationError } from 'errors/CustomError';

export const validateLength = (
  input: string,
  minLength: number,
  maxLength: number,
  fieldName: string
) => {
  if (!input) {
    return new ValidationError(`${fieldName} 값이 비어 있습니다.`);
  }
  if (input.length < minLength) {
    return new ValidationError(
      `${fieldName} 값이 너무 짧습니다. 최소 ${minLength} 글자 이상이여야 합니다.`
    );
  }
  if (input.length > maxLength) {
    return new ValidationError(
      `${fieldName} 값이 너무 짧습니다. 최대 ${minLength} 글자 이하여야 합니다.`
    );
  }
  return null;
};

export const validateUser = (nickname: string, password: string) => {
  if (
    nickname.length < NICKNAME_MIN_LENGTH ||
    nickname.length > NICKNAME_MAX_LENGTH
  ) {
    return new ValidationError(
      `닉네임의 길이는 최소 ${NICKNAME_MIN_LENGTH}글자, 최대 ${NICKNAME_MAX_LENGTH}글자 입니다.`
    );
  }
  if (
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > PASSWORD_MAX_LENGTH
  ) {
    return new ValidationError(
      `패스워드의 길이는 최소 ${PASSWORD_MIN_LENGTH}글자, 최대 ${PASSWORD_MAX_LENGTH}글자 입니다.`
    );
  }

  return null;
};
