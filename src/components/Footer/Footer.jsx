import * as React from "react";
import { Link } from "gatsby";

// Styles.
import "./Footer.css";

// Components.
import Button from "../Button";
import Constraint from "../Constraint";

// SVGs.
import SuUkrainaWhite from "../../images/logos/su-ukraina--secondary.svg";
import Adapt from "../../images/logos/adapt.svg";
import LaisvesTv from "../../images/logos/laisves-tv.svg";
import { getTranslatedText } from "../../utils/getTranslatedText";
import { localePropType } from "../../helpers/genericPropTypes";

const Footer = ({ locale }) => {
  const isLt = locale === `lt-LT`;

  return (
    <footer className="Footer">
      <Constraint>
        <div className="Footer__cta-section">
          <div className="Footer__cta-section-title">
            {getTranslatedText(`footer.sectionTitle`)}
          </div>
          <div className="Footer__cta-section-actions">
            <Button
              to={getTranslatedText(`pagePath.donate`)}
              startIcon={`donate`}
              color={`secondary`}
            >
              {getTranslatedText(`actions.wantToDonate`)}
            </Button>
            <Button
              to={getTranslatedText(`pagePath.volunteer`)}
              startIcon={`volunteer`}
              color={`secondary`}
            >
              {getTranslatedText(`actions.wantToVolunteer`)}
            </Button>
          </div>
        </div>
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
            <nav
              className="Footer__nav"
              aria-label={getTranslatedText(`ariaLabels.footerNav`)}
            >
              <ul className="Footer__menu">
                {isLt && (
                  <li>
                    <Link to="/apie-mus/">Apie mus</Link>
                  </li>
                )}
                <li>
                  <Link to={getTranslatedText(`pagePath.privacyPolicy`)}>
                    {getTranslatedText(`generic.privacyPolicy`)}
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
              {getTranslatedText(`footer.pageCoordinate`)}:
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
  locale: localePropType.isRequired,
};

export default Footer;
