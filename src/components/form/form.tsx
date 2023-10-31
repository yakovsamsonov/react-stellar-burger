import { useState, useEffect, useCallback, FC, ChangeEvent } from 'react';
import formStyle from './form.module.css';
import { Link } from 'react-router-dom';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { EMAIL_FIELD_TYPE, PASSWORD_FIELD_TYPE } from '../../utils/constants';

type TField = {
  type: string;
  name: string;
  value: string;
  icon?: any;
  placeholder?: string;
};

type TLink = {
  text: string;
  linkText: string;
  linkTo: string;
};

type TButton = {
  label: string;
  type: 'button' | 'submit' | 'reset';
};

type TForm = {
  title: string;
  fields: ReadonlyArray<TField>;
  links: ReadonlyArray<TLink>;
  buttons: ReadonlyArray<TButton>;
  formSubmit?: () => void;
  formReset?: () => void;
  formData: {};
  setFormData: (formData: {}) => void;
  errorMessage?: string;
  customDiasbleButton?: () => boolean;
};

export const Form: FC<TForm> = ({
  title,
  fields,
  links,
  buttons,
  formSubmit,
  formReset,
  formData,
  setFormData,
  errorMessage,
  customDiasbleButton,
}) => {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [hasInputError, setInputError] = useState(false);

  const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInputError(!e.target.validity.valid);
  };

  const baseDisableButton = useCallback(() => {
    return hasInputError || !Object.values(formData).every((el) => el);
  }, [formData, hasInputError]);

  useEffect(() => {
    let disableButton = true;
    if (customDiasbleButton) {
      disableButton = customDiasbleButton();
    } else {
      disableButton = baseDisableButton();
    }

    setButtonDisabled(disableButton);
  }, [baseDisableButton, customDiasbleButton]);

  return (
    <div className={formStyle['form']}>
      <form
        className={formStyle['form__input-box']}
        onSubmit={formSubmit}
        onReset={formReset}
      >
        {title ? <h2 className={formStyle['form__title']}>{title}</h2> : <></>}
        {fields.map((el, index) => {
          return el.type === PASSWORD_FIELD_TYPE ? (
            <PasswordInput
              key={index}
              value={el.value}
              name={el.name}
              placeholder={el.placeholder}
              onChange={onFieldChange}
              icon={el.icon}
            ></PasswordInput>
          ) : el.type === EMAIL_FIELD_TYPE ? (
            <EmailInput
              key={index}
              value={el.value}
              name={el.name}
              placeholder={el.placeholder}
              onChange={onFieldChange}
              isIcon={el.icon ? true : false}
            ></EmailInput>
          ) : (
            <Input
              key={index}
              value={el.value}
              name={el.name}
              placeholder={el.placeholder}
              onChange={onFieldChange}
              icon={el.icon}
            ></Input>
          );
        })}
        <div className={formStyle['form__button-box']}>
          {buttons.map((el, index) => (
            <Button
              key={index}
              disabled={isButtonDisabled}
              htmlType={el.type}
              type="primary"
              size="small"
            >
              {el.label}
            </Button>
          ))}
        </div>

        {errorMessage ? (
          <div className={formStyle['form__error-message']}>{errorMessage}</div>
        ) : (
          <></>
        )}
      </form>
      <nav className={formStyle['form__link-box']}>
        {links ? (
          links.map((el, index) => (
            <li key={index} className={formStyle['form__link-set']}>
              <p className={formStyle['form__link-description']}>{el.text}</p>
              <Link to={el.linkTo} className={formStyle['form__link-text']}>
                {el.linkText}
              </Link>
            </li>
          ))
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
};
