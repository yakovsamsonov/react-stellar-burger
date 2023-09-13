import Form from '../components/form/form';
import { PASSWORD_FIELD_TYPE, TEXT_FIELD_TYPE } from '../utils/constants';

export function ResetPassword() {
  const onFieldChange = (e) => {
    console.log(e.target.value);
  };

  const fields = [
    {
      type: PASSWORD_FIELD_TYPE,
      name: 'password',
      value: '',
      placeholder: 'Введите новый пароль',
      onChange: onFieldChange,
    },
    {
      type: TEXT_FIELD_TYPE,
      name: 'code',
      value: '',
      placeholder: 'Введите код из письма',
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
    console.log('Попытка смены пароля');
  };

  return (
    <Form
      title="Восстановление пароля"
      fields={fields}
      links={links}
      buttonLabel="Сохранить"
      formSubmit={onSumbit}
    ></Form>
  );
}
