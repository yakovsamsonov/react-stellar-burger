import Form from '../components/form/form';
import { useState } from 'react';
import { PASSWORD_FIELD_TYPE, TEXT_FIELD_TYPE } from '../utils/constants';
import { Navigate, useNavigate } from 'react-router-dom';
import { modify, GET_FROM_STORAGE } from '../utils/local-storage';
import { PASSWORD_RESET_TOKEN_SEND } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPasswordChange } from '../services/actions/user';

const emptyForm = {
  password: '',
  token: '',
};

export function ResetPassword() {
  const [formData, setformData] = useState(emptyForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetErrorText } = useSelector((store) => store.user);

  const resetTokenSend = modify(GET_FROM_STORAGE, PASSWORD_RESET_TOKEN_SEND);

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
    dispatch(confirmPasswordChange(formData)).then((res) =>
      navigate('/', { replace: true })
    );
  };

  return resetTokenSend ? (
    <Form
      title="Восстановление пароля"
      fields={fields}
      links={links}
      buttons={buttons}
      formData={formData}
      setFormData={setformData}
      formSubmit={onSumbit}
      errorMessage={resetErrorText}
    ></Form>
  ) : (
    <Navigate to="/forgot-password" replace></Navigate>
  );
}
