import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

// Components
import Constraint from "../Constraint";
import Button from "../Button";

// SVG
import Logo from "../../images/logos/su-ukraina--original.svg";

// Style
import "./HeaderAlt.css";

const HeaderAlt = ({ noSticky }) => {
  const closeMenuOnSameLink = (nextPathName) => {
    if (typeof window === `undefined`) {
      return;
    }
    const menuTriggerElement = document.getElementById(`menu-sensor`);
    if (nextPathName === window.location.pathname) {
      menuTriggerElement.click();
    }
  };

  return (
    <div className={`HeaderAlt ${noSticky ? `HeaderAlt--no-sticky` : ``}`}>
      <Constraint className="HeaderAlt__content">
        <Link to="/">
          <img
            className="HeaderAlt__logo"
            src={Logo}
            alt="SuUkraina.lt"
            height="40"
            width="235"
          />
        </Link>
        <input type="checkbox" name="menu-sensor" id="menu-sensor" />
        <label className="HeaderAlt__menu-trigger" htmlFor="menu-sensor">
          <span></span>Navigacija
        </label>
        <nav className="HeaderAlt__nav" aria-label="Pagrindinė navigacija">
          <ul className="HeaderAlt__menu">
            {/* @TODO add dynamic menu elements ? */}
            <li>
              <Link
                aria-haspopup={false}
                to="/"
                onClick={() => {
                  closeMenuOnSameLink(`/`);
                }}
              >
                Знайти довідку
              </Link>
            </li>
            <li>
              <Link
                aria-haspopup={true}
                to="/"
                onClick={() => {
                  closeMenuOnSameLink(`/`);
                }}
              >
                Важлива інформація
              </Link>
            </li>
            <li>
              <Button
                className="HeaderAlt__menu__help-btn"
                icon={`edit`}
                href="https://0rs0r9mdix1.typeform.com/to/QXLxIUjt"
                color={`primary`}
                text={`NORIU SUTEIKTI PAGALBĄ`}
                position={`left`}
                target="_blank"
                rel="noopener"
              />
            </li>
          </ul>
        </nav>
        <div className="HeaderAlt__languages">
          <div className="HeaderAlt__language HeaderAlt__language--active">
            <div className="HeaderAlt__language__icon HeaderAlt__language__icon--ua-flag-alt" />
            <div className="HeaderAlt__language__title">UK</div>
          </div>
          <div className="HeaderAlt__language">
            <div className="HeaderAlt__language__icon HeaderAlt__language__icon--lt-flag" />
            <div className="HeaderAlt__language__title">LT</div>
          </div>
        </div>
      </Constraint>
    </div>
  );
};

HeaderAlt.propTypes = {
  noSticky: PropTypes.bool,
};

export default HeaderAlt;
