import { useDispatch, useSelector } from 'react-redux';
import { Form } from '../components/form/form';
import { useState, FormEvent, FC } from 'react';
import { updateUserData } from '../services/actions';
import { TField, FieldType, TButton, TNewUser } from '../utils';
import { user as userSelector } from '../services/selectors/selectors';

export const UserInfo: FC = () => {
  const { user } = useSelector(userSelector);
  const baseUser: TNewUser = { ...user, password: '' };
  const [newUser, setNewUser] = useState<TNewUser>(baseUser);

  const dispatch: any = useDispatch();

  const fields: ReadonlyArray<TField> = [
    {
      type: FieldType.text,
      name: 'name',
      value: newUser.name,
      placeholder: 'Имя',
      icon: 'EditIcon',
    },
    {
      type: FieldType.email,
      name: 'email',
      value: newUser.email,
      icon: 'EditIcon',
    },
    {
      type: FieldType.password,
      name: 'password',
      value: newUser.password,
      icon: 'EditIcon',
    },
  ];

  const buttons: ReadonlyArray<TButton> = [
    { label: 'Сохранить', type: 'submit' },
    { label: 'Отмена', type: 'reset' },
  ];

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();
    dispatch(updateUserData(newUser)).then(() => {
      setNewUser({ ...newUser, password: '' });
    });
  };

  const onReset = (e: FormEvent): void => {
    e.preventDefault();
    setNewUser(baseUser);
  };

  const disableButton = (): boolean => {
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
      customDisableButton={disableButton}
    ></Form>
  );
};
