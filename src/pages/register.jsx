import Form from '../components/form/form';
import {
  EMAIL_FIELD_TYPE,
  PASSWORD_FIELD_TYPE,
  TEXT_FIELD_TYPE,
} from '../utils/constants';

export function Register() {
  const onFieldChange = (e) => {
    console.log(e.target.value);
  };

  const fields = [
    {
      type: TEXT_FIELD_TYPE,
      name: 'name',
      value: '',
      placeholder: 'Имя',
      onChange: onFieldChange,
    },
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
      text: 'Уже зарегистрированы?',
      linkText: 'Войти',
      linkTo: '/login',
    },
  ];

  const onSumbit = (e) => {
    e.preventDefault();
    console.log('Попытка регистрации');
  };

  return (
    <Form
      title="Регистрация"
      fields={fields}
      links={links}
      buttonLabel="Зарегистрироваться"
      formSubmit={onSumbit}
    ></Form>
  );
}
