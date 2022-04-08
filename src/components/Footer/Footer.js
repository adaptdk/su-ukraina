import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

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

// Helpers
import { isUkrainianPage } from "../../helpers/handlers";

// SVGs.
import SuUkrainaWhite from "../../images/logos/su-ukraina--secondary.svg";
import Adapt from "../../images/logos/adapt.svg";
import LaisvesTv from "../../images/logos/laisves-tv.svg";

const Footer = () => {
  const location = useLocation();
  const altFooter = isUkrainianPage(location.pathname);

  return (
    <footer className="Footer">
      <Constraint>
        {!altFooter && (
          <div className="Footer__cta-section">
            <div className="Footer__cta-section-title">
              Kiekvienas veiksmas svarbus
            </div>
            <div className="Footer__cta-section-actions">
              <Button
                to={PATH_HOW_TO_DONATE}
                startIcon={ICON_DONATE}
                color={`secondary`}
              >
                {TEXT_WANT_TO_DONATE}
              </Button>
              <Button
                to={PATH_HOW_TO_VOLUNTEER}
                startIcon={ICON_VOLUNTEER}
                color={`secondary`}
              >
                {TEXT_WANT_TO_VOLUNTEER}
              </Button>
            </div>
          </div>
        )}
        <div className="Footer__menus">
          <p>
            <img
              className="Footer__logo"
              src={SuUkrainaWhite}
              alt="SuUkraina.lt"
              height="40"
              width="235"
            />
          </p>
          <p>
            <nav className="Footer__nav" aria-label="Poraštės navigacija">
              <ul className="Footer__menu">
                {!altFooter && (
                  <li>
                    <Link to="/apie-mus/">Apie mus</Link>
                  </li>
                )}
                <li>
                  <Link to="/privatumo-politika/">
                    {altFooter
                      ? `Політика конфіденційності`
                      : `Privatumo politika`}
                  </Link>
                </li>
              </ul>
            </nav>
          </p>
        </div>
        <div className="Footer__credits">
          <p className="Footer__slogan">
            2022 | <span title="Героям слава!">Слава Україні!</span>
          </p>
          <p className="Footer__partners">
            <span className="Footer__partners-intro">
              {altFooter
                ? `Внесла внесок на сторінку:`
                : `Puslapį koordinuoja:`}
            </span>
            {` `}
            <a
              href="https://adaptagency.com/adapt-lithuania"
              rel="noopener"
              target="_blank"
            >
              <img src={Adapt} alt="Adapt LT logo" width="93" height="15" />
            </a>
            {` `}
            <a href="https://laisves.tv" rel="noopener" target="_blank">
              <img
                src={LaisvesTv}
                alt="Laisvės TV logo"
                width="49"
                height="49"
              />
            </a>
          </p>
        </div>
      </Constraint>
    </footer>
  );
};

Footer.propTypes = {
  altFooter: PropTypes.bool,
};

export default Footer;
