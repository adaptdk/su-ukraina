import * as React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import FormField from "../FormField";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import EmailInput from "../EmailInput";
import SelectInput from "../SelectInput/SelectInput";

import "./ContactForm.css";

const handleSubmit = (setFormState) => {
  return (event) => {
    event.preventDefault();

    const data = new FormData(event.target);

    setFormState({ loading: true });

    fetch(event.target.action, {
      method: event.target.method,
      headers: {
        "Content-Type": `application/json`,
      },
      body: JSON.stringify({
        name: data.get(`name`),
        email: data.get(`email`),
        description: data.get(`description`),
        category: data.get(`category`),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not OK`);
        }
      })
      .then(() => {
        setFormState({ success: true, error: false });
      })
      .catch((err) => {
        console.log(`FAILED server`, err);
        setFormState({ success: false, error: true });
      });
  };
};

const ContactForm = ({ returnDestination = `/` }) => {
  const [formState, setFormState] = React.useState({
    error: false,
    loading: false,
    success: false,
  });

  const curriedHandleSubmit = handleSubmit(setFormState);

  return (
    <div className="ContactForm">
      <div className="ContactForm__text">
        <h3>Turi idėjų? Pasidalink</h3>
        <p>
          Karas Ukrainoje sukėlė ir didžiulę dezinformacijos bei propagandos
          bangą.
        </p>
      </div>
      <div className="ContactForm__form">
        {!formState.error && !!formState.success && (
          <div>Ačiū, jūsų žinutė išsiųsta</div>
        )}
        {!formState.success && (
          <form
            method="POST"
            action={`https://ihv3yqhbe7.execute-api.eu-west-1.amazonaws.com/v1/submit?destination=${returnDestination}`}
            onSubmit={curriedHandleSubmit}
          >
            <FormField labelFor="name" label="Vardas" type="text">
              <TextInput id="name" placeholder="Vardas" name="name" />
            </FormField>

            <FormField labelFor="email" label="El. paštas" type="email">
              <EmailInput id="email" placeholder="Vardas" name="email" />
            </FormField>

            <FormField labelFor="category" label="Kategorija" type="select">
              <SelectInput id="category" name="category">
                <option value="A">A</option>
                <option value="B">B</option>
              </SelectInput>
            </FormField>

            <FormField labelFor="description" label="Aprašymas" type="textarea">
              <TextArea
                id="description"
                placeholder="Aprašymas"
                name="description"
              />
            </FormField>

            <div className="form-field form-field--type-checkbox">
              <input
                type="checkbox"
                id="privacy-policy-accepted"
                name="privacy-policy-accepted"
              />
              <label htmlFor="privacy-policy-accepted" tabIndex="0">
                Susipažinau ir sutinku su{` `}
                <a href="#" title="Privatumo politika">
                  privatumo politika
                </a>
              </label>
            </div>

            <div className="ContactForm__actions">
              {!!formState.error && !formState.success && (
                <div className="ContactForm__error-message">
                  Nepavyko išsiųsti, pabandykite darkart
                </div>
              )}
              <Button
                disabled={!!formState.loading}
                type="submit"
                text="Siųsti"
              />
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
