import { useEffect, useState } from 'react';
import Form from '../components/form/form';
import { registerNewUser } from '../services/actions/user';
import {
  EMAIL_FIELD_TYPE,
  PASSWORD_FIELD_TYPE,
  TEXT_FIELD_TYPE,
} from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const emptyForm = {
  email: '',
  password: '',
  name: '',
};

export function Register() {
  const [newUser, setNewUser] = useState(emptyForm);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [hasInputError, setInputError] = useState(false);

  const { user, registrationErrorText } = useSelector((store) => store.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFieldChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    setInputError(!e.target.validity.valid);
  };

  useEffect(() => {
    setButtonDisabled(
      hasInputError || !Object.values(newUser).every((el) => el)
    );
  }, [newUser, hasInputError]);

  useEffect(() => {
    if (user.name) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const fields = [
    {
      type: TEXT_FIELD_TYPE,
      name: 'name',
      value: newUser.name,
      placeholder: 'Имя',
      onChange: onFieldChange,
    },
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: newUser.email,
      onChange: onFieldChange,
    },
    {
      type: PASSWORD_FIELD_TYPE,
      name: 'password',
      value: newUser.password,
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
    dispatch(registerNewUser(newUser)).then(setNewUser(emptyForm));
  };

  return (
    <Form
      title="Регистрация"
      fields={fields}
      links={links}
      buttonLabel="Зарегистрироваться"
      isButtonDisabled={isButtonDisabled}
      formSubmit={onSumbit}
      errorMessage={registrationErrorText}
    ></Form>
  );
}
