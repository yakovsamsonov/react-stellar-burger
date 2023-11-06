import { Form } from '../components/form/form';
import { useState, FC, FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPasswordChange } from '../services/actions/user';
import {
  StorageAction,
  StorageActionKey,
  TField,
  TLink,
  TButton,
  modify,
  TPasswordUpdate,
} from '../utils';
import { user as userSelector } from '../services/selectors/selectors';
import { FieldType } from '../utils';

const emptyForm: TPasswordUpdate = {
  password: '',
  token: '',
};

export const ResetPassword: FC = () => {
  const [formData, setformData] = useState<TPasswordUpdate>(emptyForm);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const { resetErrorText } = useSelector(userSelector);

  const resetTokenSend = modify(
    StorageAction.get,
    StorageActionKey.PASSWORD_RESET_TOKEN_SEND
  );

  const fields: ReadonlyArray<TField> = [
    {
      type: FieldType.password,
      name: 'password',
      value: formData.password,
      placeholder: 'Введите новый пароль',
    },
    {
      type: FieldType.text,
      name: 'token',
      value: formData.token,
      placeholder: 'Введите код из письма',
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
    { label: 'Сохранить', type: 'submit' },
  ];

  const onSumbit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(confirmPasswordChange(formData)).then(() =>
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
};
