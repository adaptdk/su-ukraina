import * as React from "react";
import PropTypes from "prop-types";

import "./ContactForm.css";

const ContactForm = ({}) => {
  return (
    <div class="ContactForm">
      <div class="Constraint">
        <div class="ContactForm__text">
          <h3>Turi idėjų? Pasidalink</h3>
          <p>Karas Ukrainoje sukėlė ir didžiulę dezinformacijos bei propagandos bangą.</p>
        </div>
        <div class="ContactForm__form">
          <form>
            <div class="form-field form-field--type-text">
              <label for="name">Vardas</label>
              <input type="text" id="name" placeholder="Vardas"/>
            </div>
            <div class="form-field form-field--type-email">
              <label for="email">El. paštas</label>
              <input type="email" id="email" placeholder="El. paštas"/>
            </div>
            <div class="form-field form-field--type-select">
              <label for="type">Kategorija</label>
              <select name="type" id="type">
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
            <div class="form-field form-field--type-textarea">
              <label for="description">Aprašymas</label>
              <textarea type="text" id="description" placeholder="Aprašymas"></textarea>
            </div>
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
    </div>

  );
};

ContactForm.propTypes = {

};

export default ContactForm;
