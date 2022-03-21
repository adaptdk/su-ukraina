import * as React from "react";
import { Link } from "gatsby";

// Components.
import Constraint from "../Constraint";
import Button from "../Button";

// SVGs.
import Logo from "../../images/logos/su-ukraina--original.svg";

// Constants.
import { NAVIGATION_MAIN_MENU } from "../../constants/Navigation";

// Style.
import "./Header.css";
import PromoLine from "../PromoLine/PromoLine";

const Header = () => {
  return (
    <React.Fragment>
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
              {NAVIGATION_MAIN_MENU.map((item) => {
                return (
                  <li key={item.pathname}>
                    <Link aria-haspopup={!!item.children} to={item.pathname}>
                      {item.title}
                    </Link>
                    {item.children && (
                      <ul>
                        {item.children.map((subItem) => {
                          return (
                            <li key={subItem.pathname}>
                              <Link to={subItem.pathname}>{subItem.title}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </Constraint>
      </div>
      <PromoLine
        title="ВСЯ ВАЖЛИВА ІНФОРМАЦІЯ ДЛЯ ГРОМАДЯН УКРАЇНИ"
        titleLink="https://www.withukraine.lt"
      >
        <Button
          icon={`arrow-blue`}
          href="https://www.withukraine.lt"
          color={`secondary`}
          text={`ІНФОРМАЦІЯ`}
          position={`right`}
          target="_blank"
          rel="noopener"
        />
        <Button
          icon={`arrow-blue`}
          href="https://www.withukraine.lt/help-search"
          color={`secondary`}
          text={`послуги`}
          position={`right`}
          target="_blank"
          rel="noopener"
        />
      </PromoLine>
    </React.Fragment>
  );
};

export default Header;
