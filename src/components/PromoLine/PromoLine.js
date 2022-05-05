import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Components.
import Constraint from "../Constraint";

// Style.
import "./PromoLine.css";

const PromoLine = ({ title, subtitle, titleLink, large, children }) => {
  return (
    <div
      className={classNames(`PromoLine`, {
        "PromoLine--large": large,
      })}
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
};

PromoLine.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleLink: PropTypes.string,
  large: PropTypes.bool,
  children: PropTypes.node,
};

export default PromoLine;
