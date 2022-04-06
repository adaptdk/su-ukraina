import * as React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import FormField from "../FormField";
import TextArea from "../TextArea";
import EmailInput from "../EmailInput";

import "./RefugeeForm.css";
import PhoneInput from "../PhoneInput";

const handleSubmit = (setFormState) => {
  return (event) => {
    const formData = new FormData(event.target);

    setFormState({ error: false, loading: true, success: false });

    const body = {
      email: formData.get(`email`) || ``,
      phone: formData.get(`phone`) || ``,
      description: formData.get(`description`) || ``,
      "privacy-policy-accepted": formData.get(`privacy-policy-accepted`) || ``,
    };

    fetch(event.target.action, {
      method: event.target.method,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not OK`);
        }
        return response;
      })
      .then(() => {
        setFormState({ error: false, loading: false, success: true });
      })
      .catch((error) => {
        setFormState({ error: true, loading: false, success: false });
        console.error(error);
      });

    event.preventDefault();
  };
};

const RefugeeForm = ({ returnDestination = `/` }) => {
  const [formState, setFormState] = React.useState({
    error: false,
    loading: false,
    success: false,
  });

  const curriedHandleSubmit = React.useCallback(handleSubmit(setFormState), []);

  return (
    <div className="RefugeeForm">
      <div className="RefugeeForm__text">
        <div className="RefugeeForm__text-title">
          ЯКЩО ВИ НЕ МОЖЕТЕ ЗНАЙТИ ІНФОРМАЦІЮ
        </div>
        <p>
          Ви також можете залишити пропозиції щодо того, як зробити веб-сайт
          кращим для вашого використання.
        </p>
      </div>
      <div className="RefugeeForm__form">
        {formState.success ? (
          <div className="RefugeeForm__success">
            <p>Ваше повідомлення було відправлене. Дякую!</p>
          </div>
        ) : (
          <form
            method="POST"
            action={`https://api.suukraina.lt/v1/submit/ua?destination=${encodeURIComponent(
              returnDestination
            )}`}
            onSubmit={curriedHandleSubmit}
          >
            <FormField
              labelFor="description"
              label="повідомлення"
              type="textarea"
            >
              <TextArea
                id="description"
                placeholder="Введіть свою відповідь тут"
                name="description"
                required
              />
            </FormField>

            <FormField labelFor="phone" label="Телефон" type="text">
              <PhoneInput
                id="phone"
                name="phone"
                pattern="^\+\d{6,14}$"
                placeholder="+37011111111"
              />
            </FormField>

            <FormField labelFor="email" label="Е. пошта" type="email">
              <EmailInput
                id="email"
                placeholder="email@email.com"
                name="email"
                required
              />
            </FormField>

            <div className="FormField form-field--type-checkbox">
              <label htmlFor="privacy-policy-accepted" tabIndex="0">
                <input
                  type="checkbox"
                  id="privacy-policy-accepted"
                  name="privacy-policy-accepted"
                  required
                />
                Я прочитав і погоджуюсь{` `}
                <a href="/privacy-policy" title="політика конфіденційності">
                  політика конфіденційності
                </a>
              </label>
            </div>

            {!!formState.error && (
              <p className="RefugeeForm__error">
                Не вдалося надіслати. Будь ласка, спробуйте ще раз або повідомте
                технічні проблеми{` `}
                <a href="mailto:suukraina@adaptagency.com">
                  suukraina@adaptagency.com
                </a>
                .
              </p>
            )}

            <div className="RefugeeForm__actions">
              <Button
                color="transparent"
                disabled={formState.loading}
                type="submit"
              >
                Надіслати
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

RefugeeForm.propTypes = {
  returnDestination: PropTypes.string,
};

export default RefugeeForm;
