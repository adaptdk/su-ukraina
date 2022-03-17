import * as React from "react";
import { Link } from "gatsby";

import Constraint from "../Constraint";

import Logo from "../../images/logos/su-ukraina--original.svg";

import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <Constraint className="Header__content">
        <Link to="/">
          <img
            className="Header__logo"
            src={Logo}
            alt="SuUkraina.lt"
            height="40"
            width="235"
          />
        </Link>
        <input type="checkbox" name="menu-sensor" id="menu-sensor" />
        <label className="Header__menu-trigger" htmlFor="menu-sensor">
          <span></span>Navigacija
        </label>
        <nav className="Header__nav" aria-label="Pagrindinė navigacija">
          <ul className="Header__menu">
            <li>
              <Link aria-haspopup="true" to="/kaip-galiu-padeti/">
                Kaip galiu padėti?
              </Link>
              <ul>
                <li>
                  <Link to="/kaip-galiu-padeti/aukojimas/lietuvoje/">
                    Aukojimas
                  </Link>
                </li>
                <li>
                  <Link to="/kaip-galiu-padeti/savanoryste/">Savanorystė</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link aria-haspopup="true" to="/protesto-formos/">
                Protesto formos
              </Link>
              <ul>
                <li>
                  <Link to="/protesto-formos/akcijos/">Akcijos</Link>
                </li>
                <li>
                  <Link to="/protesto-formos/renginiai/">Renginiai</Link>
                </li>
                <li>
                  <Link to="/protesto-formos/budinkite-veikti/ambasada/">
                    Budinkite veikti
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link aria-haspopup="true" to="/bukime-budrus/">
                Būkime budrūs
              </Link>
              <ul>
                <li>
                  <Link to="/bukime-budrus/piliecio-atmintine/">
                    Piliečio atmintinė
                  </Link>
                </li>
                <li>
                  <Link to="/bukime-budrus/patikima-informacija/">
                    Patikima informacija
                  </Link>
                </li>
                <li>
                  <Link to="/bukime-budrus/kaip-saugotis-nuo-sukciu-ir-dezinformacijos/">
                    Sukčiai ir dezinformacija
                  </Link>
                </li>
                <li>
                  <Link to="/bukime-budrus/zinokite-ka-perkate/">
                    Žinokite ką perkate
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </Constraint>
    </div>
  );
};

export default Header;
