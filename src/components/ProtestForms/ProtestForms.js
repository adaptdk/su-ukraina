import * as React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

import "./ProtestForms.css";

const ProtestForms = ({ title }) => {
  return (
    <section className="ProtestForms">

      {!!title &&
      <h2 className="ProtestForms__title">{title}</h2>
      }

      <ul class="ProtestForms__button-list">
        <li>
          <Button
            icon={`arrow-white`}
            to={`/protesto-formos/akcijos`}
            color={`primary`}
            text={`Akcijos`}
            position={`right`}
          />
        </li>
        <li>
          <Button
            icon={`arrow-white`}
            to={`/protesto-formos/renginiai`}
            color={`primary`}
            text={`Renginiai`}
            position={`right`}
          />
        </li>
        <li>
          <Button
            icon={`arrow-white`}
            to={`/protesto-formos/laisku-rasymas`}
            color={`primary`}
            text={`Laiškų rašymas`}
            position={`right`}
          />
        </li>
      </ul>

    </section>
  );
};

ProtestForms.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};


export default ProtestForms;
