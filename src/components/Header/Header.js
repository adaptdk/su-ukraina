import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

// Components.
import Constraint from "../Constraint";
import Button from "../Button";

// SVGs.
import Logo from "../../images/logos/su-ukraina--original.svg";

// Constants.
import {
  NAVIGATION_MAIN_MENU,
  NAVIGATION_MAIN_MENU_ALT,
} from "../../constants/Navigation";

// Style.
import "./Header.css";

const Header = ({ noSticky, altHeader }) => {
  const [headerHeight, setHeaderHeight] = React.useState(null);
  const headerRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const resetHeaderHeight = () => {
      const newHeight = headerRef.current?.offsetHeight;
      if (newHeight !== headerHeight) {
        setHeaderHeight(newHeight);
      }
    };

    resetHeaderHeight();
    window.addEventListener(`resize`, resetHeaderHeight);
    return () => {
      window.removeEventListener(`resize`, resetHeaderHeight);
    };
  }, []);

  const closeMenuOnSameLink = (nextPathName) => {
    if (typeof window === `undefined`) {
      return;
    }
    const menuTriggerElement = document.getElementById(`menu-sensor`);
    if (nextPathName === window.location.pathname) {
      menuTriggerElement.click();
    }
  };

  const mainMenu = () => {
    if (altHeader) {
      return NAVIGATION_MAIN_MENU_ALT;
    }
    return NAVIGATION_MAIN_MENU;
  };

  return (
    <div
      className={`Header ${noSticky ? `Header--no-sticky` : ``}`}
      ref={headerRef}
    >
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
            {mainMenu().map((item) => {
              return (
                <li key={item.pathname}>
                  <Link
                    aria-haspopup={!!item.children}
                    to={item.pathname}
                    onClick={() => {
                      closeMenuOnSameLink(item.pathname);
                    }}
                  >
                    {item.title}
                  </Link>
                  {item.children && (
                    <ul>
                      {item.children.map((subItem) => {
                        return (
                          <li key={subItem.pathname}>
                            <Link
                              to={subItem.pathname}
                              onClick={() => {
                                closeMenuOnSameLink(subItem.pathname);
                              }}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
            {altHeader && (
              <li>
                <Button
                  className="Header__menu__help-btn"
                  startIcon={`edit`}
                  href="https://0rs0r9mdix1.typeform.com/to/QXLxIUjt"
                  color={`primary`}
                  target="_blank"
                  rel="noopener"
                >
                  Noriu suteikti pagalbą
                </Button>
              </li>
            )}
          </ul>
        </nav>
        {/* Commented out for future use */}
        {/* @TODO add functionality to actually switch language
        {withCTA && (
          <div className="Header__languages">
            <div className="Header__language Header__language--active">
              <div className="Header__language__icon Header__language__icon--ua-flag-alt" />
              <div className="Header__language__title">UK</div>
            </div>
            <div className="Header__language">
              <div className="Header__language__icon Header__language__icon--lt-flag" />
              <div className="Header__language__title">LT</div>
            </div>
          </div>
        )} */}
      </Constraint>
    </div>
  );
};

Header.propTypes = {
  noSticky: PropTypes.bool,
  altHeader: PropTypes.bool,
};

export default Header;
