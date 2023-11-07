import { useState, FC, FormEvent } from 'react';
import { Form } from '../components/form/form';
import { registerNewUser } from '../services/actions/user';
import { useSelector } from 'react-redux';
import { user as userSelector } from '../services/selectors/selectors';
import { FieldType, TButton, TField, TLink, TNewUser } from '../utils';
import { useAppDispatch } from '../services/hooks';

const emptyForm: TNewUser = {
  email: '',
  password: '',
  name: '',
};

export const Register: FC = () => {
  const [newUser, setNewUser] = useState<TNewUser>(emptyForm);

  const { registrationErrorText } = useSelector(userSelector);

  const dispatch = useAppDispatch();

  const fields: ReadonlyArray<TField> = [
    {
      type: FieldType.text,
      name: 'name',
      value: newUser.name,
      placeholder: 'Имя',
    },
    {
      type: FieldType.email,
      name: 'email',
      value: newUser.email,
    },
    {
      type: FieldType.password,
      name: 'password',
      value: newUser.password,
    },
  ];
  const links: ReadonlyArray<TLink> = [
    {
      text: 'Уже зарегистрированы?',
      linkText: 'Войти',
      linkTo: '/login',
    },
  ];

  const buttons: ReadonlyArray<TButton> = [
    { label: 'Зарегистрироваться', type: 'submit' },
  ];

  const onSumbit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(registerNewUser(newUser)).then(() => {
      setNewUser(emptyForm);
    });
  };

  return (
    <Form
      title="Регистрация"
      fields={fields}
      links={links}
      buttons={buttons}
      formSubmit={onSumbit}
      formData={newUser}
      setFormData={setNewUser}
      errorMessage={registrationErrorText}
    ></Form>
  );
};
