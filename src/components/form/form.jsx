import { useState, useEffect } from 'react';
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
  buttonLabel,
  formSubmit,
  formData,
  setFormData,
  errorMessage,
}) {
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [hasInputError, setInputError] = useState(false);

  const onFieldChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInputError(!e.target.validity.valid);
  };

  useEffect(() => {
    setButtonDisabled(
      hasInputError || !Object.values(formData).every((el) => el)
    );
  }, [formData, hasInputError]);

  return (
    <div className={formStyle['form']}>
      <form className={formStyle['form__input-box']} onSubmit={formSubmit}>
        {title ? <h2 className={formStyle['form__title']}>{title}</h2> : <></>}
        {fields.map((el, index) =>
          el.type === PASSWORD_FIELD_TYPE ? (
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
          )
        )}
        <Button
          disabled={isButtonDisabled}
          htmlType="submit"
          type="primary"
          size="small"
        >
          {buttonLabel}
        </Button>
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
