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
            {NAVIGATION_MAIN_MENU.map((item) => (
              <li key={item.pathname}>
                <Link aria-haspopup={!!item.children} to={item.pathname}>
                  {item.title}
                </Link>
                {item.children && (
                  <ul>
                    {item.children.map((subItem) => (
                      <li key={subItem.pathname}>
                        <Link to={subItem.pathname}>{subItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </Constraint>
      <div className="promoLine">
        <Constraint className="promoLine__content">
          <a href="https://www.zukraine.lt">
            ВСЯ ВАЖЛИВА ІНФОРМАЦІЯ ДЛЯ ГРОМАДЯН УКРАЇНИ
          </a>
          <div class="promoLine__actions">
            <Button
              icon={`arrow-blue`}
              href="https://www.zukraine.lt/info"
              color={`secondary`}
              text={`ІНФОРМАЦІЯ`}
              position={`right`}
              target="_blank"
            />
            <Button
              icon={`arrow-blue`}
              href="https://www.zukraine.lt"
              color={`secondary`}
              text={`Lentelė`}
              position={`right`}
              target="_blank"
            />
          </div>
        </Constraint>
      </div>
    </div>
  );
};

export default Header;
