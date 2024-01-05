import { ErrorMessages } from '../components/Form/Warn'

export const FORM_ERROR_MESSAGES: ErrorMessages = {
  username: {
    minLength: '8자 이상 입력해주세요',
    maxLength: '12자 이하로 입력해주세요.',
    required: '필수 입력사항입니다.',
    pattern: '영문, 숫자만 입력해주세요.',
  },
  email: {
    minLength: '4자 이상 입력해주세요',
    maxLength: '12자 이하로 입력해주세요.',
    required: '필수 입력사항입니다.',
    pattern: '영문, 숫자만 입력해주세요.',
  },
  password: {
    minLength: '8자 이상 입력해주세요.',
    maxLength: '20자 이하로 입력해주세요.',
    required: '필수 입력사항입니다.',
    pattern: '영문, 숫자만 입력해주세요.',
    validate: '비밀 번호는 영어, 숫자를 포함해야합니다.',
  },
  passwordConfirm: {
    minLength: '8자 이상 입력해주세요.',
    maxLength: '20자 이하로 입력해주세요.',
    required: '필수 입력사항입니다.',
    pattern: '영문, 숫자만 입력해주세요.',
    validate: '비밀 번호는 영어, 숫자를 포함해야합니다.',
  },
}
