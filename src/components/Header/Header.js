import * as React from "react";
import { Link } from "gatsby";

import Constraint from "../Constraint";

import "./Header.css";

const Header = () => {
  return (
    <header className="Header">
      <Constraint>
        <Link to="/">
          <h1>Labas</h1>
        </Link>
        <p>
          Русский корабль, иди нахуй
          {` `}
          <span role="img" aria-label="Ukrainos vėliava">
            🇺🇦
          </span>
        </p>
        <nav>
          <ul>
            <li>
              <Link to="/kaip-galiu-padeti">Kaip galiu padėti?</Link>
            </li>
            <li>
              <Link to="/protesto-formos">Protesto formos</Link>
            </li>
          </ul>
        </nav>
      </Constraint>
    </header>
  );
};

export default Header;
