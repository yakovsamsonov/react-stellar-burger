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
}) {
  return (
    <div className={formStyle['form']}>
      <form className={formStyle['form__input-box']} onSubmit={formSubmit}>
        <h2 className={formStyle['form__title']}>{title}</h2>
        {fields.map((el, index) =>
          el.type === PASSWORD_FIELD_TYPE ? (
            <PasswordInput
              key={index}
              value={el.value}
              name={el.name}
              placeholder={el.placeholder}
              onChange={el.onChange}
            ></PasswordInput>
          ) : el.type === EMAIL_FIELD_TYPE ? (
            <EmailInput
              key={index}
              value={el.value}
              name={el.name}
              placeholder={el.placeholder}
              onChange={el.onChange}
            ></EmailInput>
          ) : (
            <Input
              key={index}
              value={el.value}
              name={el.name}
              placeholder={el.placeholder}
              onChange={el.onChange}
            ></Input>
          )
        )}
        <Button htmlType="submit" type="primary" size="small">
          {buttonLabel}
        </Button>
      </form>
      <nav className={formStyle['form__link-box']}>
        {links.map((el, index) => (
          <li key={index} className={formStyle['form__link-set']}>
            <p className={formStyle['form__link-description']}>{el.text}</p>
            <Link to={el.linkTo} className={formStyle['form__link-text']}>
              {el.linkText}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
}
