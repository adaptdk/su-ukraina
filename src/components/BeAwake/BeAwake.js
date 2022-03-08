import * as React from "react";
import PropTypes from "prop-types";
import { StaticImage } from "gatsby-plugin-image"

// Style.
import "./BeAwake.css";

// Components.
import Button from "../Button";

const BeAwake = ({ title }) => {
  return (
    <section className="BeAwake">

      <div className="BeAwake__text">
        {!!title && <h2 className="BeAwake__title">{title}</h2>}
        <ul className="BeAwake__button-list">
          <li>
            <Button
              icon={`arrow-blue`}
              to={`/bukime-budrus/patikima-informacija`}
              color={`transparent`}
              text={`Patikima informacija`}
              position={`right`}
            />
          </li>
          <li>
            <Button
              icon={`arrow-blue`}
              to={`/bukime-budrus/piliecio-atmintine`}
              color={`transparent`}
              text={`Piliečio atmintinė`}
              position={`right`}
            />
          </li>
          <li>
            <Button
              icon={`arrow-blue`}
              to={`/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos`}
              color={`transparent`}
              text={`Kaip apsisaugoti nuo sukčių?`}
              position={`right`}
            />
          </li>
        </ul>
      </div>

      <div class="BeAwake__image">
        <StaticImage src="../../images/photos/bukime-budrus-ir-pasiruose.jpg" alt={title}/>
      </div>

    </section>
  );
};

BeAwake.propTypes = {
  title: PropTypes.string,
};


export default BeAwake;
