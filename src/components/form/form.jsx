import { useState, useEffect, useCallback } from 'react';
import formStyle from './form.module.css';
import { Link } from 'react-router-dom';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { EMAIL_FIELD_TYPE, PASSWORD_FIELD_TYPE } from '../../utils/constants';

export default function Form({
  title,
  fields,
  links,
  buttons,
  formSubmit,
  formReset,
  formData,
  setFormData,
  errorMessage,
  customDiableButton,
}) {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [hasInputError, setInputError] = useState(false);

  const onFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInputError(!e.target.validity.valid);
  };

  const baseDisableButton = useCallback(() => {
    return hasInputError || !Object.values(formData).every((el) => el);
  }, [formData, hasInputError]);

  useEffect(() => {
    let disableButton = true;
    if (customDiableButton) {
      disableButton = customDiableButton();
    } else {
      disableButton = baseDisableButton();
    }

    setButtonDisabled(disableButton);
  }, [baseDisableButton, customDiableButton]);

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
              icon={el.icon}
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
}
