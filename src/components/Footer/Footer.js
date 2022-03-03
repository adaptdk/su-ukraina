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
          <Button>Noriu tapti savanoriu</Button>
        </div>
        <div className="Footer__credits">
          <div>2022 | Слава Україні!</div>
          <div>
            <a
              href="https://adaptagency.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Adapt
            </a>
            ,{` `}
            <a
              href="https://laisves.tv"
              rel="noopener noreferrer"
              target="_blank"
            >
              Laisvės TV
            </a>
          </div>
        </div>
      </Constraint>
    </footer>
  );
};

export default Footer;
