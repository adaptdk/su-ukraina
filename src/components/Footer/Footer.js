import * as React from "react";

import Button from "../Button";
import Constraint from "../Constraint";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="Footer">
      <Constraint>
        <div className="Footer__cta-section">
          Kiekvienas veiksmas svarbus
          <Button to="/kaip-galiu-padeti/aukojimas">Noriu aukoti</Button>
          <Button to="/kaip-galiu-padeti/savanoryste">
            Noriu tapti savanoriu
          </Button>
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
