import * as React from "react";
import PropTypes from "prop-types";
import { useLocation } from "@gatsbyjs/reach-router";

// Components.
import Constraint from "../Constraint";

// Style.
import "./PromoLine.css";

const PromoLine = ({
  title,
  subtitle,
  titleLink,
  className = ``,
  modifier,
  children,
}) => {
  const location = useLocation();
  const path = location.pathname;

  function ConditionalRender(props) {
    if (props.currentPath.includes(`refugee-guide`)) {
      return null;
    }
    return (
      <div
        className={`PromoLine ${
          modifier ? `PromoLine--${modifier}` : ``
        } ${className}`}
      >
        <Constraint className="PromoLine__content">
          <a href={titleLink} rel="noopener" target="_blank">
            {title}
            {!!subtitle && <span>{subtitle}</span>}
          </a>
          <div className="PromoLine__actions">{children}</div>
        </Constraint>
      </div>
    );
  }

  ConditionalRender.propTypes = {
    currentPath: PropTypes.string,
  };

  return <ConditionalRender currentPath={path} />;
};

PromoLine.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleLink: PropTypes.string,
  modifier: PropTypes.string,
  children: PropTypes.node,
};

export default PromoLine;
