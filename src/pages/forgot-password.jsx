import Form from '../components/form/form';
import { useState } from 'react';
import { EMAIL_FIELD_TYPE } from '../utils/constants';

const emptyForm = {
  email: '',
};

export function ForgotPassword() {
  const [formData, setformData] = useState(emptyForm);

  const fields = [
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: formData.email,
      placeholder: 'Укажите e-mail',
    },
  ];
  const links = [
    {
      text: 'Вспомнили пароль?',
      linkText: 'Войти',
      linkTo: '/login',
    },
  ];

  const buttons = [{ label: 'Восстановить', type: 'submit' }];

  const onSumbit = (e) => {
    e.preventDefault();
    console.log('Попытка восстановления пароля');
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
