import { FormEvent, useState, FC } from 'react';
import { Form } from '../components/form/form';
import { FieldType, TField, TButton, TLink, TUserWithPassword } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { performLogin } from '../services/actions/user';
import { user as userSelector } from '../services/selectors/selectors';

const emptyForm: TUserWithPassword = {
  email: '',
  password: '',
};

export const Login: FC = () => {
  const [loginData, setLoginData] = useState<TUserWithPassword>(emptyForm);
  const { loginErrorText } = useSelector(userSelector);

  const dispatch: any = useDispatch();

  const fields: ReadonlyArray<TField> = [
    {
      type: FieldType.email,
      name: 'email',
      value: loginData.email,
    },
    {
      type: FieldType.password,
      name: 'password',
      value: loginData.password,
    },
  ];
  const links: ReadonlyArray<TLink> = [
    {
      text: 'Вы — новый пользователь?',
      linkText: 'Зарегистрироваться',
      linkTo: '/register',
    },
    {
      text: 'Забыли пароль?',
      linkText: 'Восстановить пароль',
      linkTo: '/forgot-password',
    },
  ];

  const buttons: ReadonlyArray<TButton> = [{ label: 'Войти', type: 'submit' }];

  const onSumbit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(performLogin(loginData)).then(() => {
      setLoginData(emptyForm);
    });
  };

  return (
    <Form
      title="Вход"
      fields={fields}
      links={links}
      buttons={buttons}
      formSubmit={onSumbit}
      formData={loginData}
      setFormData={setLoginData}
      errorMessage={loginErrorText}
    ></Form>
  );
};
