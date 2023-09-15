import { useState } from 'react';
import Form from '../components/form/form';
import { registerNewUser } from '../services/actions/user';
import {
  EMAIL_FIELD_TYPE,
  PASSWORD_FIELD_TYPE,
  TEXT_FIELD_TYPE,
} from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';

const emptyForm = {
  email: '',
  password: '',
  name: '',
};

export function Register() {
  const [newUser, setNewUser] = useState(emptyForm);

  const { registrationErrorText } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const fields = [
    {
      type: TEXT_FIELD_TYPE,
      name: 'name',
      value: newUser.name,
      placeholder: 'Имя',
    },
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: newUser.email,
    },
    {
      type: PASSWORD_FIELD_TYPE,
      name: 'password',
      value: newUser.password,
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
    dispatch(registerNewUser(newUser)).then(setNewUser(emptyForm));
  };

  return (
    <Form
      title="Регистрация"
      fields={fields}
      links={links}
      buttonLabel="Зарегистрироваться"
      formSubmit={onSumbit}
      formData={newUser}
      setFormData={setNewUser}
      errorMessage={registrationErrorText}
    ></Form>
  );
}
