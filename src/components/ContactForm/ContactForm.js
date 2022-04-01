import * as React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import FormField from "../FormField";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import EmailInput from "../EmailInput";
// import SelectInput from "../SelectInput/SelectInput";

import "./ContactForm.css";

const handleSubmit = (setFormState) => {
  return (event) => {
    const formData = new FormData(event.target);

    setFormState({ error: false, loading: true, success: false });

    const body = {
      name: formData.get(`name`) || ``,
      email: formData.get(`email`) || ``,
      category: formData.get(`category`) || ``,
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

const ContactForm = ({ returnDestination = `/` }) => {
  const [formState, setFormState] = React.useState({
    error: false,
    loading: false,
    success: false,
  });

  const curriedHandleSubmit = React.useCallback(handleSubmit(setFormState), []);

  return (
    <div className="ContactForm">
      <div className="ContactForm__text">
        <div className="ContactForm__text-title">Turi idėjų? Pasidalink</div>
        <p>
          Šis puslapis skirtas pateikti svarbiausią informaciją apie pagalbą
          Ukrainai.
        </p>
        <p>Jeigu turite idėjų kaip papildyti turinį, kviečiame susisiekti.</p>
      </div>
      <div className="ContactForm__form">
        {formState.success ? (
          <div className="ContactForm__success">
            <p>Jūsų žinutė išsiųsta. Ačiū!</p>
          </div>
        ) : (
          <form
            method="POST"
            action={`https://api.suukraina.lt/v1/submit?destination=${encodeURIComponent(
              returnDestination
            )}`}
            onSubmit={curriedHandleSubmit}
          >
            <FormField labelFor="name" label="Vardas" type="text">
              <TextInput
                id="name"
                placeholder="Vardenis Pavardenis"
                name="name"
                required
              />
            </FormField>

            <FormField labelFor="email" label="El. paštas" type="email">
              <EmailInput
                id="email"
                placeholder="vardas@post.lt"
                name="email"
                required
              />
            </FormField>

            {/*
          <FormField labelFor="category" label="Kategorija" type="select">
            <SelectInput id="category" name="category">
              <option value="A">A</option>
              <option value="B">B</option>
            </SelectInput>
          </FormField>
          */}

            <FormField labelFor="description" label="Žinutė" type="textarea">
              <TextArea
                id="description"
                placeholder="Žinutė"
                name="description"
                required
              />
            </FormField>

            <div className="form-field form-field--type-checkbox">
              <label htmlFor="privacy-policy-accepted" tabIndex="0">
                <input
                  type="checkbox"
                  id="privacy-policy-accepted"
                  name="privacy-policy-accepted"
                  required
                />
                Susipažinau ir sutinku su{` `}
                <a href="/privatumo-politika" title="Privatumo politika">
                  privatumo politika
                </a>
              </label>
            </div>

            {!!formState.error && (
              <p className="ContactForm__error">
                Išsiųsti nepavyko. Bandykite dar kartą arba praneškite apie
                technines problemas{` `}
                <a href="mailto:suukraina@adaptagency.com">
                  suukraina@adaptagency.com
                </a>
                .
              </p>
            )}

            <div className="ContactForm__actions">
              <Button
                color="transparent"
                disabled={formState.loading}
                type="submit"
              >
                Siųsti
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

ContactForm.propTypes = {
  returnDestination: PropTypes.string,
};

export default ContactForm;
