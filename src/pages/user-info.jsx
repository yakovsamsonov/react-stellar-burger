import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../components/form/form';
import {
  TEXT_FIELD_TYPE,
  EMAIL_FIELD_TYPE,
  PASSWORD_FIELD_TYPE,
} from '../utils/constants';
import { useState } from 'react';
import { updateUserData } from '../services/actions/user';

export function UserInfo() {
  const { user } = useSelector((store) => store.user);
  const baseUser = { ...user, password: '' };
  const [newUser, setNewUser] = useState(baseUser);

  const dispatch = useDispatch();

  const fields = [
    {
      type: TEXT_FIELD_TYPE,
      name: 'name',
      value: newUser.name,
      placeholder: 'Имя',
      icon: 'EditIcon',
    },
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: newUser.email,
      icon: 'EditIcon',
    },
    {
      type: PASSWORD_FIELD_TYPE,
      name: 'password',
      value: newUser.password,
      icon: 'EditIcon',
    },
  ];

  const buttons = [
    { label: 'Сохранить', type: 'submit' },
    { label: 'Отмена', type: 'reset' },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(newUser)).then(() => {
      setNewUser({ ...newUser, password: '' });
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    setNewUser(baseUser);
  };

  const disableButton = () => {
    return JSON.stringify(newUser) === JSON.stringify(baseUser);
  };

  return (
    <Form
      fields={fields}
      buttons={buttons}
      formSubmit={onSubmit}
      formReset={onReset}
      formData={newUser}
      setFormData={setNewUser}
      customDiableButton={disableButton}
    ></Form>
  );
}
