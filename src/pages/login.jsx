import { useState } from 'react';
import Form from '../components/form/form';
import { EMAIL_FIELD_TYPE, PASSWORD_FIELD_TYPE } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/actions/user';

const emptyForm = {
  email: '',
  password: '',
};

export function Login() {
  const [loginData, setLoginData] = useState(emptyForm);
  const { loginErrorText } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const fields = [
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: loginData.email,
    },
    {
      type: PASSWORD_FIELD_TYPE,
      name: 'password',
      value: loginData.password,
    },
  ];
  const links = [
    {
      text: 'Вы — новый пользователь?',
      linkText: 'Зарегистрироваться',
      linkTo: '/register',
    },
    {
      text: 'Забыли пароль?',
      linkText: 'Восстановить пароль',
      linkTo: '/forgot-password',
    },
  ];

  const buttons = [{ label: 'Войти', type: 'submit' }];

  const onSumbit = (e) => {
    e.preventDefault();
    dispatch(login(loginData)).then(setLoginData(emptyForm));
  };

  return (
    <Form
      title="Вход"
      fields={fields}
      links={links}
      buttons={buttons}
      formSubmit={onSumbit}
      formData={loginData}
      setFormData={setLoginData}
      errorMessage={loginErrorText}
    ></Form>
  );
}
