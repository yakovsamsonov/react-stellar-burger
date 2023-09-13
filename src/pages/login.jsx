import Form from '../components/form/form';
import { EMAIL_FIELD_TYPE, PASSWORD_FIELD_TYPE } from '../utils/constants';

export function Login() {
  const onFieldChange = (e) => {
    console.log(e.target.value);
  };

  const fields = [
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: '',
      onChange: onFieldChange,
    },
    {
      type: PASSWORD_FIELD_TYPE,
      name: 'password',
      value: '',
      onChange: onFieldChange,
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

  const onSumbit = (e) => {
    e.preventDefault();
    console.log('Попытка логина');
  };

  return (
    <Form
      title="Вход"
      fields={fields}
      links={links}
      buttonLabel="Войти"
      formSubmit={onSumbit}
    ></Form>
  );
}