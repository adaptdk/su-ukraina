import * as React from "react";
import PropTypes from "prop-types";

import Constraint from "../Constraint";
import "./ContactForm.css";
import FormField from "../FormField";
import TextInput from "../TextInput";
import TextArea from "../TextArea";
import EmailInput from "../EmailInput";
import SelectInput from "../SelectInput/SelectInput";

const ContactForm = ({}) => {
  return (
    <div class="ContactForm">
        <div class="ContactForm__text">
          <h3>Turi idėjų? Pasidalink</h3>
          <p>Karas Ukrainoje sukėlė ir didžiulę dezinformacijos bei propagandos bangą.</p>
        </div>
        <div class="ContactForm__form">
          <form>
            <FormField labelFor="name" label="Vardas" type="text">
              <TextInput id="name" placeholder="Vardas"/>
            </FormField>

            <FormField labelFor="email" label="El. paštas" type="email">
              <EmailInput id="name" placeholder="Vardas"/>
            </FormField>

            <FormField labelFor="type" label="Kategorija" type="select">
              <SelectInput id="type" >
                <option value="A">A</option>
                <option value="B">B</option>
              </SelectInput>
            </FormField>

            <FormField labelFor="description" label="Aprašymas" type="textarea">
              <TextArea id="description" placeholder="Aprašymas"/>
            </FormField>

            <div class="form-field form-field--type-checkbox">
              <input type="checkbox" id="privacy-policy"/>
              <label for="privacy-policy" tabindex="0">Susipažinau ir sutinku su <a href="#" title="Privatumo politika">privatumo politika</a></label>
            </div>

            <div class="ContactForm__actions">
              Buttono komponentas
            </div>
          </form>
        </div>
    </div>
  );
};

ContactForm.propTypes = {

};

export default ContactForm;
