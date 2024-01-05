import type { FieldErrors } from 'react-hook-form'

import { SignInInputs } from '../SignUp'
import { FORM_ERROR_MESSAGES } from '../../constants'

type InputTypes = 'username' | 'email' | 'password' | 'passwordConfirm'
type ErrorTypes =
  | 'minLength'
  | 'maxLength'
  | 'required'
  | 'pattern'
  | 'validate'
  | string
interface WarnProps {
  inputType: InputTypes
  errors: FieldErrors<SignInInputs>
}
export type ErrorMessages = {
  [key in InputTypes]: { [key in ErrorTypes]: string }
}

export const SignUpFormErrorWarn = ({ inputType, errors }: WarnProps) => {
  // CASE : 에러가 없음
  if (!errors[inputType]) return null

  // CASE : onSubmit시 발생하는 에러
  if (errors[inputType]?.message) {
    return <div>{errors[inputType]?.message}</div>
  }

  const errorType = errors[inputType]?.type
  // CASE : 추적된 에러
  if (errorType && FORM_ERROR_MESSAGES[inputType][errorType]) {
    return <div>{FORM_ERROR_MESSAGES[inputType][errorType]}</div>
  }

  return <div>유효하지 않은 입력입니다.</div>
}
