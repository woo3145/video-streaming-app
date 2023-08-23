import { CLOUD_MAX_LENGTH, CLOUD_MIN_LENGTH } from 'constants/lengthLimits';
import CloudRepository, { SaveCloudInput } from 'repositories/CloudRepository';
import { validateLength, validateUser } from 'utils/validation';
import bcrypt from 'bcryptjs';
import { CustomError } from 'errors/CustomError';

//** 데이터를 검증하고 비즈니스 로직을 처리하는 책임을 가짐 */

const cloudRepository = new CloudRepository();

export const fetchClouds = async (
  videoId: number
): Promise<ICloudComment[] | undefined> => {
  return await cloudRepository.fetch(videoId);
};

export const saveCloud = async (saveCloudInput: SaveCloudInput) => {
  const { nickname, password, content } = saveCloudInput;

  const validationResultForUser = validateUser(nickname, password);
  if (validationResultForUser) {
    throw validationResultForUser;
  }
  const validationResultForContent = validateLength(
    content,
    CLOUD_MIN_LENGTH,
    CLOUD_MAX_LENGTH,
    '내용'
  );
  if (validationResultForContent) {
    throw validationResultForContent;
  }

  return await cloudRepository.save(saveCloudInput);
};

export const deleteCloud = async (cloudId: string, password: string) => {
  const cloudData = await cloudRepository.fetchOneWithPassword(cloudId);

  if (!cloudData) {
    throw new CustomError('구름이 존재하지 않습니다.');
  }

  const passwordMatch = await bcrypt.compare(password, cloudData.password);
  if (!passwordMatch) {
    throw new CustomError('비밀번호가 일치하지 않습니다.');
  }
  return await cloudRepository.delete(cloudId);
};
