import { useSelector } from 'react-redux';
import Form from '../components/form/form';
import { TEXT_FIELD_TYPE, EMAIL_FIELD_TYPE } from '../utils/constants';
import { useState } from 'react';

export function UserInfo() {
  const { user } = useSelector((store) => store.user);
  const [newUser, setNewUser] = useState(user);

  const fields = [
    {
      type: TEXT_FIELD_TYPE,
      name: 'name',
      value: user.name,
      placeholder: 'Имя',
      icon: 'EditIcon',
    },
    {
      type: EMAIL_FIELD_TYPE,
      name: 'email',
      value: user.email,
      icon: 'EditIcon',
    },
  ];

  const onSubmit = () => {
    console.log('Сохранение изменений');
  };

  return (
    <Form
      fields={fields}
      buttonLabel="Сохранить"
      formSubmit={onSubmit}
      formData={newUser}
      setFormData={setNewUser}
      //errorMessage={registrationErrorText}
    ></Form>
  );
}
