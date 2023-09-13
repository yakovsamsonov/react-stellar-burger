import Form from '../components/form/form';
import { EMAIL_FIELD_TYPE } from '../utils/constants';

export function ForgotPassword() {
  const onFieldChange = (e) => {
    console.log(e.target.value);
  };

  const fields = [
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: '',
      placeholder: 'Укажите e-mail',
      onChange: onFieldChange,
    },
  ];
  const links = [
    {
      text: 'Вспомнили пароль?',
      linkText: 'Войти',
      linkTo: '/login',
    },
  ];

  const onSumbit = (e) => {
    e.preventDefault();
    console.log('Попытка восстановления пароля');
  };

  return (
    <Form
      title="Восстановление пароля"
      fields={fields}
      links={links}
      buttonLabel="Восстановить"
      formSubmit={onSumbit}
    ></Form>
  );
}