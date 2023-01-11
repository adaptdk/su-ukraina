import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useLocation } from "@gatsbyjs/reach-router";
import classNames from "classnames";

// Components.
import Constraint from "../Constraint";
import LanguageSwitch from "../LanguageSwitch";

// SVGs.
import Logo from "../../images/logos/su-ukraina--original.svg";
import { getTranslatedText } from "../../utils/getTranslatedText";

// Style.
import "./Header.css";
import {
  localePropType,
  navigationPropTypes,
  nodeSlugsDefaultProps,
  nodeSlugsPropTypes,
} from "../../helpers/genericPropTypes";

const Header = ({ noSticky, navigation, currentNodeSlugs }) => {
  const [headerHeight, setHeaderHeight] = React.useState(null);
  const { pathname } = useLocation();

  const navigationItems = navigation?.items;

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

  return (
    <div
      className={classNames(`Header`, {
        "Header--no-sticky": noSticky,
      })}
      ref={headerRef}
    >
      {!!headerHeight && (
        <style>{`:root { --header-height: ${headerHeight}px; }`}</style>
      )}
      <Constraint className="Header__content">
        <Link
          className="Header__logo-wrapper"
          to={getTranslatedText(`pagePath.home`)}
        >
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
            {navigationItems?.at(0) &&
              navigationItems.map((item) => {
                return (
                  <li
                    key={item.id}
                    className={classNames(`Header__menu-link`, {
                      "is-active": pathname.includes(item.slug),
                    })}
                  >
                    <Link
                      aria-haspopup={!!item.items}
                      to={`/${item.slug}`}
                      onClick={() => {
                        closeMenuOnSameLink(item.slug);
                      }}
                    >
                      {item.title}
                    </Link>
                    {item.items && (
                      <ul>
                        {item.items.map((subItem) => {
                          return (
                            <li key={subItem.slug}>
                              <Link
                                to={`/${item.slug}/${subItem.slug}`}
                                onClick={() => {
                                  closeMenuOnSameLink(subItem.slug);
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
          </ul>
        </nav>
        <LanguageSwitch currentNodeSlugs={currentNodeSlugs} />
      </Constraint>
    </div>
  );
};

Header.propTypes = {
  noSticky: PropTypes.bool,
  navigation: navigationPropTypes.isRequired,
  locale: localePropType.isRequired,
  currentNodeSlugs: nodeSlugsPropTypes,
};

Header.defaultProps = {
  currentNodeSlugs: nodeSlugsDefaultProps,
};

export default Header;
