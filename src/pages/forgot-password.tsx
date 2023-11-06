import { Form } from '../components/form/form';
import { FormEvent, useState, FC } from 'react';
import { FieldType, TButton, TEmail, TField, TLink } from '../utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestPasswordChange } from '../services/actions';

const emptyForm: TEmail = {
  email: '',
};

export const ForgotPassword: FC = () => {
  const [formData, setformData] = useState(emptyForm);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const fields: ReadonlyArray<TField> = [
    {
      type: FieldType.email,
      name: 'email',
      value: formData.email,
      placeholder: 'Укажите e-mail',
    },
  ];
  const links: ReadonlyArray<TLink> = [
    {
      text: 'Вспомнили пароль?',
      linkText: 'Войти',
      linkTo: '/login',
    },
  ];

  const buttons: ReadonlyArray<TButton> = [
    { label: 'Восстановить', type: 'submit' },
  ];

  const onSumbit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(requestPasswordChange(formData)).then(() => {
      navigate('/reset-password');
    });
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
};
