import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/form/form';
import { TEXT_FIELD_TYPE, EMAIL_FIELD_TYPE } from '../utils/constants';
import { useState } from 'react';
import { updateUserData } from '../services/actions/user';

export function UserInfo() {
  const { user } = useSelector((store) => store.user);
  const [newUser, setNewUser] = useState(user);

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
  ];

  const buttons = [
    { label: 'Сохранить', type: 'submit' },
    { label: 'Отмена', type: 'reset' },
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData(newUser));
  };

  const onReset = (e) => {
    e.preventDefault();
    setNewUser(user);
  };

  const disableButton = () => {
    return JSON.stringify(newUser) === JSON.stringify(user);
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
      //errorMessage={registrationErrorText}
    ></Form>
  );
}
