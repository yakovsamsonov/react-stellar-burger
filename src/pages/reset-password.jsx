import Form from '../components/form/form';
import { useState } from 'react';
import { PASSWORD_FIELD_TYPE, TEXT_FIELD_TYPE } from '../utils/constants';

const emptyForm = {
  password: '',
  token: '',
};

export function ResetPassword() {
  const [formData, setformData] = useState(emptyForm);

  const fields = [
    {
      type: PASSWORD_FIELD_TYPE,
      name: 'password',
      value: formData.password,
      placeholder: 'Введите новый пароль',
    },
    {
      type: TEXT_FIELD_TYPE,
      name: 'token',
      value: formData.token,
      placeholder: 'Введите код из письма',
    },
  ];
  const links = [
    {
      text: 'Вспомнили пароль?',
      linkText: 'Войти',
      linkTo: '/login',
    },
  ];

  const buttons = [{ label: 'Сохранить', type: 'submit' }];

  const onSumbit = (e) => {
    e.preventDefault();
    console.log('Попытка смены пароля');
  };

  return (
    <Form
      title="Восстановление пароля"
      fields={fields}
      links={links}
      buttons={buttons}
      formData={formData}
      setFormData={setformData}
      formSubmit={onSumbit}
    ></Form>
  );
}
