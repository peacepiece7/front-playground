import { SubmitHandler, useForm } from 'react-hook-form'
import './SignUp.css'
import { SignUpFormErrorWarn } from './Form/Warn'

export interface SignInInputs {
  email: string
  username: string
  password: string
  passwordConfirm: string
}
export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch, // onChange 역할, form의 input value에 바인딩 된 값을 가져옴
    setError,
  } = useForm<SignInInputs>({ mode: 'onBlur' })
  /**
   * mode: 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all'
   * onBlur 초점이 흐려질 때(unFocused될 때)
   * onSubmit 제출 이벤트가 발생할 때
   * onChange input value가 변할 때
   * onTouched Focused될 때
   */

  console.log('WATCHED :' + watch('email'))

  const onSubmit: SubmitHandler<SignInInputs> = (data: SignInInputs) => {
    console.log(data)
    const isValied = onValid(data)
    if (!isValied) return
    alert('회원가입이 완료되었습니다.')
    reset()
  }
  const onValid = (data: SignInInputs) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        'passwordConfirm',
        { message: '비밀번호가 일치하지 않습니다!' },
        { shouldFocus: true } // 에러가 발생한 input으로 focus 이동
      )
      return false
    }
    return true
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form className='signup-form' onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          {...register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/i,
          })}
        />
        <div className='warn'>
          <SignUpFormErrorWarn inputType='email' errors={errors} />
        </div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          {...register('username', {
            required: true,
            pattern: /^[a-zA-Z0-9]{4,12}$/i,
            maxLength: 20,
            minLength: 8,
          })}
        />
        <div className='warn'>
          <SignUpFormErrorWarn inputType='username' errors={errors} />
        </div>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          {...register('password', {
            required: true,
            maxLength: 20,
            minLength: 8,
            validate: (v) => !!(v.match(/[a-zA-Z]/g) && v.match(/[0-9]/g)),
          })}
        />
        <div className='warn'>
          <SignUpFormErrorWarn inputType='password' errors={errors} />
        </div>
        <label htmlFor='passwordConfirm'>Confirm Password</label>
        <input
          id='passwordConfirm'
          type='password'
          {...register('passwordConfirm', {
            required: true,
            maxLength: 20,
            minLength: 8,
            /**
             * 독특한 조건이 있다면 validate을 사용한다.
             * @see https://xpectation.tistory.com/221#--%--Custom%--Validate%--%EB%A-%-C%EB%--%A-%EA%B-%B-
             */
            validate: (v) => !!(v.match(/[a-zA-Z]/g) && v.match(/[0-9]/g)),
          })}
        />
        <div className='warn'>
          <SignUpFormErrorWarn inputType='passwordConfirm' errors={errors} />
        </div>
        <input type='submit' value='Sign Up'></input>
      </form>
    </div>
  )
}
