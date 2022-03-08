import * as React from "react";
import PropTypes from "prop-types";

import Button from "../Button";
import FormField from "../FormField";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import EmailInput from "../EmailInput";
// import SelectInput from "../SelectInput/SelectInput";

import "./ContactForm.css";

const ContactForm = ({ returnDestination = `/` }) => {
  return (
    <div className="ContactForm">
      <div className="ContactForm__text">
        <h3>Turi idėjų? Pasidalink</h3>
        <p>
          Šis puslapis skirtas pateikti svarbiausią informaciją apie pagalbą Ukrainai.
        </p>
        <p>
          Jeigu turite idėjų kaip papildyti turinį, kviečiame susisiekti.
        </p>
      </div>
      <div className="ContactForm__form">
        <form
          method="POST"
          action={`https://ihv3yqhbe7.execute-api.eu-west-1.amazonaws.com/v1/submit?destination=${returnDestination}`}
        >
          <FormField labelFor="name" label="Vardas" type="text">
            <TextInput
              id="name"
              placeholder="Vardenis Pavardenis"
              name="name"
            />
          </FormField>

          <FormField labelFor="email" label="El. paštas" type="email">
            <EmailInput id="email" placeholder="vardas@post.lt" name="email" />
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

          <div className="ContactForm__actions">
            <Button color="transparent" type="submit" text="Siųsti" />
          </div>
        </form>
      </div>
    </div>
  );
};

ContactForm.propTypes = {
  returnDestination: PropTypes.string,
};

export default ContactForm;
