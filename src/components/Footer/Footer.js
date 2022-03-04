import * as React from "react";

// Styles.
import "./Footer.css";

// Components.
import Button from "../Button";
import Constraint from "../Constraint";

// Constants.
import {
  PATH_HOW_TO_DONATE,
  PATH_HOW_TO_VOLUNTEER,
  ICON_DONATE,
  ICON_VOLUNTEER,
  TEXT_WANT_TO_DONATE,
  TEXT_WANT_TO_VOLUNTEER,
} from "../../constants/Footer";

const Footer = () => {
  return (
    <footer className="Footer">
      <Constraint>
        <div className="Footer__cta-section">
          Kiekvienas veiksmas svarbus
          <Button
            to={PATH_HOW_TO_DONATE}
            icon={ICON_DONATE}
            text={TEXT_WANT_TO_DONATE}
          />
          <Button
            to={PATH_HOW_TO_VOLUNTEER}
            icon={ICON_VOLUNTEER}
            text={TEXT_WANT_TO_VOLUNTEER}
          />
        </div>
        <div className="Footer__credits">
          <p>
            2022 | <span title="Героям слава!">Слава Україні!</span>
          </p>
          <p>
            Русский корабль, иди нахуй
            {` `}
            <span role="img" aria-label="Ukrainos vėliava">
              🇺🇦
            </span>
          </p>
          <p>
            <a
              href="https://adaptagency.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              „Adapt“
            </a>
            ,{` `}
            <a
              href="https://laisves.tv"
              rel="noopener noreferrer"
              target="_blank"
            >
              „Laisvės TV“
            </a>
          </p>
        </div>
      </Constraint>
    </footer>
  );
};

export default Footer;
